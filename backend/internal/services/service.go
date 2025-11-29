package service

import (
	"log/slog"

	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/ArtemST2006/HackChange/internal/services/services"
	"github.com/go-chi/jwtauth/v5"
)

type Authorization interface {
	GenerateJWTRToken(uint) (*services.TokenPair, error)
	TokenStruct() *jwtauth.JWTAuth
	GenerateHashPassword(string) (string, error)
	RefreshToken(string) (*services.TokenPair, error)
	CreateUser(schema.Student) (uint, error)
	GetUser(string, string) (*services.TokenPair,*schema.Student, error)
	Logout(string) error
}

type Service struct {
	Authorization
}

func NewService(repo *repository.Repository, log *slog.Logger) *Service {
	return &Service{
		Authorization: services.NewAuthService(repo.Authorization, log),
	}
}
