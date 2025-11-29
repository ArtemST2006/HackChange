package repository

import (
	"context"
	"io"
	"log/slog"

	"github.com/ArtemST2006/HackChange/internal/repository/miniorep"
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

type Minio interface{
	UploadHomework(ctx context.Context, lessonID, homeworkID string, files []schema.HomeworkUploadFile) error
	GetHomework(ctx context.Context, lessonID, homeworkID, fileName string) (io.ReadCloser, error)
	GetHomeworkURL(ctx context.Context, lessonID, homeworkID string, fileNames []string, ttlSeconds int64) (map[string]string, error)
}
 


type Repository struct{
	Authorization 
	Minio
}


func NewRepository(db *gorm.DB,log *slog.Logger) *Repository{
	return &Repository{
		Authorization: postgres.NewAuthPostgres(db),
		Minio: miniorep.NewMinioClient(),
	}
}
