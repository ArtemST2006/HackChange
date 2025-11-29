package impl

import (
	"os"
	"time"

	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo      repository.Authorization
	TokenAuth *jwtauth.JWTAuth // Структура с готовымы методами для работы с JWT
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{
		repo:      repo,
		TokenAuth: jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil), // TODO поменять секрет
	}
}

type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
}

func (s *AuthService) GenerateHashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost) // австоматически генерирует соль
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func (s *AuthService) GenerateJWTToken(userID uint) (string, string, error) {
	claims := map[string]any{
		"user_id": userID,
		"exp":     time.Now().Add(15 * time.Minute).Unix(),
	}

	_, token, err := s.TokenAuth.Encode(claims)
	if err != nil {
		return "", "", err
	}

	_, refreshToken, err := s.TokenAuth.Encode(nil)
	if err != nil {
		return "", "", err
	}

	return token, refreshToken, err
}

func (s *AuthService) TokenStruct() *jwtauth.JWTAuth {
	return s.TokenAuth
}

// func (s *AuthService) RefreshToken()
