// internal/repository/repository.go

package repository

import (
	"context"
	"io"

	"github.com/ArtemST2006/HackChange/internal/repository/miniorep"
	"github.com/ArtemST2006/HackChange/internal/repository/postgres"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type Authorization interface {
	CreateUser(schema.Student) (uint, error)
	GetUser(string) (*schema.Student, error)
	CreateRefreshToken(schema.RefreshToken) error
	GetValidRefreshToken(string) (*schema.RefreshToken, error)
	RevokeRefreshToken(uint) error
	RevokeAllRefreshTokens(string) error
}

type Minio interface {
	UploadHomework(ctx context.Context, lessonID, homeworkID string, files []schema.HomeworkUploadFile) error
	GetHomework(ctx context.Context, lessonID, homeworkID, fileName string) (io.ReadCloser, error)
	GetHomeworkURL(ctx context.Context, lessonID, homeworkID string, fileNames []string, ttlSeconds int64) (map[string]string, error)
}

type Courses interface {
	GetCourseDashboard(schema.DashboardRequest) (schema.DashboardResponse, error)
	GetCourseLessons(schema.LessonsRequest) (schema.LessonsResponse, error)
	GetCourseLesson(schema.LessonReq) (schema.LessonResp, error)
	SignupCourse(schema.SignupCourseReq) (schema.SignupCourseResp, error)
}

type User interface {
	GetUser(uint) (*schema.Student, *schema.StudentData, error)
	UpdateUser(userID uint, user *schema.StudentProfile) error
	GetUserCourses(userID uint) (*[]schema.CourseDB, error)
	UserChangePass(userID uint, passwords *schema.UserChangePassReq) error
}

type Comment interface {
	CreateCourseComment(comment *schema.CommentCourse) error
	GetCourseCommentsByCourseID(courseID uint) ([]schema.CommentCourseWithUser, error)
	CreateLessonComment(comment *schema.CommentLesson) error
	GetLessonCommentsByLessonID(lessonID uint) ([]schema.CommentLessonWithUser, error)
	CourseExists(courseID uint) (bool, error)
	LessonExists(lessonID uint) (bool, error)
}

type Repository struct {
	Authorization
	Minio
	User
	Courses
	Comment
}

func NewRepository(db *gorm.DB) *Repository {
	//TODO implement repositories
	return &Repository{
		Authorization: nil,
		Courses:       postgres.NewCoursesRepository(db),
		User:          postgres.NewUserRepo(db),
		Comment:       postgres.NewCommentPostgres(db),
		Minio:         miniorep.NewMinioClient(),
	}
}
