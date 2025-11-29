package services

import (
	"context"
	"io"

	"github.com/ArtemST2006/HackChange/internal/repository/miniorep"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type HomeworkService struct {
	minioRepo *miniorep.MinioRepository
}

func NewHomeworkService(minioRepo *miniorep.MinioRepository) *HomeworkService {
	return &HomeworkService{minioRepo: minioRepo}
}

func (s *HomeworkService) UploadHomework(ctx context.Context, lessonID, homeworkID string, files []schema.HomeworkUploadFile) error {
	return s.minioRepo.UploadHomework(ctx, lessonID, homeworkID, files)
}

func (s *HomeworkService) GetHomework(ctx context.Context, lessonID, homeworkID, fileName string) (io.ReadCloser, error) {
	return s.minioRepo.GetHomework(ctx, lessonID, homeworkID, fileName)
}

func (s *HomeworkService) GetHomeworkURL(ctx context.Context, lessonID, homeworkID string, fileNames []string, ttlSeconds int64) (map[string]string, error) {
	return s.minioRepo.GetHomeworkURL(ctx, lessonID, homeworkID, fileNames, ttlSeconds)
}
