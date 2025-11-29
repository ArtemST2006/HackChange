package services

import (
	"time"

	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/crypto/bcrypt"

	"github.com/ArtemST2006/HackChange/internal/repository"
)

type AuthService struct {
	repo      repository.Authorization
	TokenAuth *jwtauth.JWTAuth // Структура с готовымы методами для работы с JWT
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{
		repo:      repo,
		TokenAuth: jwtauth.New("HS256", []byte("secret"), nil),// TODO поменять секрет
	}
}


func (s *AuthService) GenerateHashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost) // австоматически генерирует соль
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func (s *AuthService) GenerateJWTToken(userID uint) (string, error) {
	claims := map[string]any{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}

	_, token, err := s.TokenAuth.Encode(claims)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthService) TokenStruct() *jwtauth.JWTAuth {
	return s.TokenAuth
}
