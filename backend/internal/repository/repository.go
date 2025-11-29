// internal/repository/repository.go

package repository

import (
	"github.com/ArtemST2006/HackChange/internal/repository/postgres"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

// === Интерфейсы ===
type Authorization interface {
	//TODO methods for authorization
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
	User
	Courses
	Comment
}

func NewRepository(db *gorm.DB) *Repository {
	//TODO implement repositories
	return &Repository{
		Authorization: nil,
		Courses:       postgres.NewCoursesRepository(db),
		User:          NewUserRepo(db),
		Comment:       NewCommentPostgres(db),
	}
}
