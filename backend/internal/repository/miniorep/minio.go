package miniorep

import (
	"context"
	"fmt"
	"io"

	"github.com/ArtemST2006/HackChange/internal/config"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)


type MinioRepository struct {
	Client *minio.Client
	Bucket string
}

func NewMinioClient() *MinioRepository {
	endpoint, err := config.GetEnv("MINIO_ENDPOINT")
	if err != nil {
		fmt.Errorf("failed to get minio endpoint: %w", err)
	}
	accessKeyID, err := config.GetEnv("MINIO_ROOT_USER")
	if err != nil {
		fmt.Errorf("failed to get minio credentials: %w", err)
	}
	secretAccessKey,err := config.GetEnv("MINIO_ROOT_PASSWORD")
	if err != nil {
		fmt.Errorf("failed to get minio credentials: %w", err)
	}

	client, err := minio.New(endpoint, &minio.Options{
		Creds : credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: false,
	})
	if err != nil{
		fmt.Errorf("failed to create minio client: %w", err)
	}

	return &MinioRepository{
		Client: client,
		Bucket: "uploads",
	}
}


func (m *MinioRepository) UploadFile(ctx context.Context, object string, data io.Reader, size int64, contentType string) error {
	_, err := m.Client.PutObject(ctx, m.Bucket, object, data, size, minio.PutObjectOptions{ContentType: contentType})
	
	return err
}

func (m *MinioRepository) GetFile(object string) (io.ReadCloser, error){
	obj , err := m.Client.GetObject(context.Background(), m.Bucket, object, minio.StatObjectOptions{})
	if err != nil {
		return nil, err
	}

	return obj, nil
}
