package repository

import (
	"github.com/ArtemST2006/HackChange/internal/repository/postgres"
	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type Authorization interface {
	//TODO methods for authorization
}

type Courses interface {
	GetCourseDashboard(schema.DashboardRequest) (schema.DashboardResponse, error)
	GetCourseLessons(schema.LessonsRequest) (schema.LessonsResponse, error)
	GetCourseLesson(schema.LessonReq) (schema.LessonResp, error)
	SignupCourse(schema.SignupCourseReq) (schema.SignupCourseResp, error)
}

type Repository struct {
	Authorization
	Courses
}

func NewRepository(db *gorm.DB) *Repository {
	//TODO implement repositories
	return &Repository{
		Authorization: nil,
		Courses:       postgres.NewCoursesRepository(db),
	}
}
