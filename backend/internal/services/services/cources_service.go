package services

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type CoursesService struct {
	repo repository.Courses
}

func NewCoursesService(repo repository.Courses) *CoursesService {
	return &CoursesService{
		repo: repo,
	}
}

func (c *CoursesService) GetCourseDashboard(req schema.DashboardRequest) (schema.DashboardResponse, error) {
	return c.repo.GetCourseDashboard(req)
}

func (c *CoursesService) GetCourseLessons(req schema.LessonsRequest) (schema.LessonsResponse, error) {
	return c.repo.GetCourseLessons(req)
}

func (c *CoursesService) GetCourseLesson(req schema.LessonReq) (schema.LessonResp, error) {
	return c.repo.GetCourseLesson(req)
}

func (c *CoursesService) SignupCourse(req schema.SignupCourseReq) (schema.SignupCourseResp, error) {
	return c.repo.SignupCourse(req)
}
