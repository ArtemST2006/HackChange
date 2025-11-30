package miniorep

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/url"
	"time"

	"github.com/ArtemST2006/HackChange/internal/config"
	"github.com/ArtemST2006/HackChange/internal/schema"
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
	return &MinioRepository{Client: nil, Bucket: "uploads"}
	}
	accessKeyID, err := config.GetEnv("MINIO_ROOT_USER")
	if err != nil {
	return &MinioRepository{Client: nil, Bucket: "uploads"}
	}
	secretAccessKey,err := config.GetEnv("MINIO_ROOT_PASSWORD")
	if err != nil {
	return &MinioRepository{Client: nil, Bucket: "uploads"}
	}

	client, err := minio.New(endpoint, &minio.Options{
		Creds : credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: false,
	})
	if err != nil{
	return &MinioRepository{Client: nil, Bucket: "uploads"}
	}

	return &MinioRepository{
		Client: client,
		Bucket: "uploads",
	}
}


func (m *MinioRepository) UploadFile(ctx context.Context, object string, data io.Reader, size int64, contentType string) error {
	exists, err := m.Client.BucketExists(ctx, m.Bucket)
	if err != nil {
		return err
	}
	if !exists {
		if err := m.Client.MakeBucket(ctx, m.Bucket, minio.MakeBucketOptions{}); err != nil {
			return err
		}
	}

	_, err = m.Client.PutObject(ctx, m.Bucket, object, data, size, minio.PutObjectOptions{ContentType: contentType})
	return err
}


func (m *MinioRepository) GetFile(object string) (io.ReadCloser, error) {
	obj, err := m.Client.GetObject(context.Background(), m.Bucket, object, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}

	_, err = obj.Stat()
	if err != nil {
		return nil, err
	}

	return obj, nil
}

func (m *MinioRepository) UploadHomework(ctx context.Context, lessonID, homeworkID string, files []schema.HomeworkUploadFile) error {
	for _, f := range files {
		objectName := fmt.Sprintf("%s/homework/%s/%s", lessonID, homeworkID, f.Name)
		if err := m.UploadFile(ctx, objectName, bytes.NewReader(f.Data), int64(len(f.Data)), "application/octet-stream"); err != nil {
			return err
		}
	}
	return nil
}


func (m *MinioRepository) GetHomework(ctx context.Context, lessonID, homeworkID, fileName string) (io.ReadCloser, error) {
	objectName := fmt.Sprintf("%s/homework/%s/%s", lessonID, homeworkID, fileName)
	return m.GetFile(objectName)
}

func (m *MinioRepository) GetHomeworkURL(ctx context.Context, lessonID, homeworkID string, fileNames []string, ttlSeconds int64) (map[string]string, error) {
	if m.Client == nil {
		return nil, fmt.Errorf("minio client is not initialized")
	}
	if ttlSeconds <= 0 {
		ttlSeconds = 15 * 60 
	}
	res := make(map[string]string, len(fileNames))
	for _, name := range fileNames {
		objectName := fmt.Sprintf("%s/homework/%s/%s", lessonID, homeworkID, name)
		reqParams := make(url.Values)
		presignedURL, err := m.Client.PresignedGetObject(ctx, m.Bucket, objectName, time.Duration(ttlSeconds)*time.Second, reqParams)
		if err != nil {
			res[name] = ""
			continue
		}
		res[name] = presignedURL.String()
	}
	return res, nil
}
