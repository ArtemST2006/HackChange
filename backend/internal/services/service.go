package services

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"

	"github.com/ArtemST2006/HackChange/internal/services/impl"
	"github.com/go-chi/jwtauth/v5"
)

type Authorization interface {
	TokenStruct() *jwtauth.JWTAuth
}

type Courses interface {
	GetCourseDashboard(schema.DashboardRequest) (schema.DashboardResponse, error)
	GetCourseLessons(schema.LessonsRequest) (schema.LessonsResponse, error)
	GetCourseLesson(schema.LessonReq) (schema.LessonResp, error)
	SignupCourse(schema.SignupCourseReq) (schema.SignupCourseResp, error)
}

type User interface {
	GetUser(uint) (*schema.StudentProfile, error)
	UpdateUser(uint, *schema.StudentProfile) (*uint, error)
	GetUserCourses(uint) (*[]schema.CourseDB, error)
	UserChangePass(uint, *schema.UserChangePassReq) (*uint, error)
}

type Service struct {
	Authorization
	Courses
	User
	CommentService CommentService
}

type CommentService = impl.CommentService

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Authorization:  impl.NewAuthService(repo.Authorization),
		Courses:        impl.NewCoursesService(repo.Courses),
		User:           impl.NewUserService(repo.User),
		CommentService: impl.NewCommentService(repo.Comment),
	}
}
