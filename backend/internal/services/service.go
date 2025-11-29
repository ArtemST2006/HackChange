package services

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/services/impl"
	"github.com/go-chi/jwtauth/v5"
)

type Authorization interface {
	TokenStruct() *jwtauth.JWTAuth
}

type CommentService = impl.CommentService

type Service struct {
	Authorization  Authorization
	CommentService CommentService
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Authorization:  impl.NewAuthService(repo.Authorization),
		CommentService: impl.NewCommentService(repo.Comment),
	}
}
