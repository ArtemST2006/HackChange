package service

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/services/services"
	"github.com/go-chi/jwtauth/v5"
) 
type Authorization interface{ 
	GenerateJWTToken(uint) (string, error)
	TokenStruct() *jwtauth.JWTAuth
	GenerateHashPassword(string) (string, error) 
}


 type Service struct{ 
	Authorization 
} 
func NewService(repo *repository.Repository) *Service{
	return &Service{ 
		Authorization: services.NewAuthService(repo.Authorization), 
		} 
	}