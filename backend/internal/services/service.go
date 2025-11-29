package service

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/ArtemST2006/HackChange/internal/services/services"
	"github.com/go-chi/jwtauth/v5"
)

type Authorization interface {
	// GenerateJWTToken(uint) (string, error)
	TokenStruct() *jwtauth.JWTAuth
	// GenerateHashPassword(string) (string, error)
}

type Courses interface {
	GetCourseDashboard(schema.DashboardRequest) (schema.DashboardResponse, error)
	GetCourseLessons(schema.LessonsRequest) (schema.LessonsResponse, error)
	GetCourseLesson(schema.LessonReq) (schema.LessonResp, error)
	SignupCourse(schema.SignupCourseReq) (schema.SignupCourseResp, error)
}

type Service struct {
	Authorization
	Courses
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Authorization: services.NewAuthService(repo.Authorization),
		Courses:       services.NewCoursesService(repo.Courses),
	}
}
