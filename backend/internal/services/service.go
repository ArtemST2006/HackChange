package service

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/services/services"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/go-chi/jwtauth/v5"
)

type Authorization interface {
	// GenerateJWTToken(uint) (string, error)
	TokenStruct() *jwtauth.JWTAuth
	// GenerateHashPassword(string) (string, error)
}

type User interface {
	GetUser(uint) (*schema.StudentProfile, error)
	UpdateUser(uint, *schema.StudentProfile) (*uint, error)	
	GetUserCourses(uint) (*[]schema.CourseDB, error)
	UserChangePass(uint, *schema.UserChangePassReq) (*uint, error) 
}

type Service struct {
	Authorization
	User
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Authorization: services.NewAuthService(repo.Authorization),
		User:          services.NewUserService(repo.User),
	}
}
