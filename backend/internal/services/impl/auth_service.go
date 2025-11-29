package impl

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/asaskevich/govalidator"
)

type AuthService struct {
	repo      repository.Authorization
	TokenAuth *jwtauth.JWTAuth
	log       *slog.Logger // Структура с готовымы методами для работы с JWT
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{
		repo:      repo,
		TokenAuth: jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil),
	}
}

type TokenPair struct {
	AccessToken  string        `json:"access_token"`
	RefreshToken string        `json:"refresh_token"`
	ExpiresIn    time.Duration `json:"expires_in"`
}

func (s *AuthService) CreateUser(user schema.Student) (uint, error) {
	if !govalidator.IsEmail(user.Email) {
		s.log.Error("invalid email format")
		return 0, fmt.Errorf("invalid credentials")
	}
	if user.HashPassword == "" || len(user.HashPassword) < 8 {
		s.log.Error("password too short or empty")
		return 0, fmt.Errorf("invalid credentials")
	}
	user.HashPassword, _ = s.GenerateHashPassword(user.HashPassword)
	s.log.Info("creating user", "email", user.Email)
	return s.repo.CreateUser(user)
}

func (s *AuthService) GetUser(email string, password string) (*TokenPair, *schema.Student, error) {
	if !govalidator.IsEmail(email) {
		s.log.Error("invalid email format")
		return nil, nil, fmt.Errorf("invalid credentials")
	}
	user, err := s.repo.GetUser(email)
	if err != nil {
		s.log.Error("user not found", "email", email)
		return nil, nil, gorm.ErrRecordNotFound
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.HashPassword), []byte(password))
	if err != nil {
		return nil, nil, fmt.Errorf("invalid credentials")
	}
	tokenPair, err := s.GenerateJWTRToken(user.ID)
	if err != nil {
		return nil, nil, err
	}
	s.log.Info("user authenticated", "email", email)
	return tokenPair, user, nil
}

func (s *AuthService) Logout(refreshToken string) error {
	hash := sha256.Sum256([]byte(refreshToken))
	hashString := hex.EncodeToString(hash[:])

	storedToken, err := s.repo.GetValidRefreshToken(hashString)
	if err != nil {
		return err
	}

	if err := s.repo.RevokeRefreshToken(storedToken.ID); err != nil {
		return err
	}

	s.log.Info("user logged out", "user_id", storedToken.UserID)
	return nil
}

func (s *AuthService) GenerateHashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost) // австоматически генерирует соль
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func (s *AuthService) GenerateJWTRToken(userId uint) (*TokenPair, error) {
	claims := map[string]any{
		"user_id": userId,
		"exp":     jwtauth.ExpireIn(15 * time.Minute),
	}

	_, tokenString, err := s.TokenAuth.Encode(claims)
	if err != nil {
		return nil, err
	}

	raw := make([]byte, 32)

	_, err = rand.Read(raw)
	if err != nil {
		return nil, err
	}
	refreshToken := hex.EncodeToString(raw)

	hash := sha256.Sum256([]byte(refreshToken))
	hashString := hex.EncodeToString(hash[:])

	rt := schema.RefreshToken{
		UserID:    userId,
		TokenHash: hashString,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	}
	err = s.repo.CreateRefreshToken(rt)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  tokenString,
		RefreshToken: refreshToken,
		ExpiresIn:    15 * time.Minute,
	}, nil

}

func (s *AuthService) RefreshToken(oldRefreshToken string) (*TokenPair, error) {
	hash := sha256.Sum256([]byte(oldRefreshToken))
	hashString := hex.EncodeToString(hash[:])

	storedToken, err := s.repo.GetValidRefreshToken(hashString)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			s.log.Info("invalid refresh token attempt")
		} else {
			err = s.repo.RevokeAllRefreshTokens(hashString)
			s.log.Warn("maybe attack", "hash", hashString)
		}
		return nil, fmt.Errorf("invalid or expired refresh token")
	}

	if err := s.repo.RevokeRefreshToken(storedToken.ID); err != nil {
		return nil, err
	}

	return s.GenerateJWTRToken(storedToken.UserID)
}

func (s *AuthService) TokenStruct() *jwtauth.JWTAuth {
	return s.TokenAuth
}
