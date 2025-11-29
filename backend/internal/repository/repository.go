package repository

import (
	"log/slog"

	postgres "github.com/ArtemST2006/HackChange/internal/repository/postgres"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type Authorization interface{
	CreateUser(schema.Student) (uint, error)
	GetUser(string) (*schema.Student, error)
	CreateRefreshToken(schema.RefreshToken) error
	GetValidRefreshToken(string) (*schema.RefreshToken, error)
	RevokeRefreshToken(uint) error
	RevokeAllRefreshTokens(string) error
}


type Repository struct{
	Authorization 
}


func NewRepository(db *gorm.DB,log *slog.Logger) *Repository{
	return &Repository{
		Authorization: postgres.NewAuthPostgres(db),
	}
}

