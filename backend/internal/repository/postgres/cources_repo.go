package postgres

import (
	"errors"
	"fmt"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type CoursesRepository struct {
	db *gorm.DB
}

func NewCoursesRepository(db *gorm.DB) *CoursesRepository {
	return &CoursesRepository{
		db: db,
	}
}

func (c *CoursesRepository) GetCourseDashboard(req schema.DashboardRequest) (schema.DashboardResponse, error) {
	var course schema.Course

	if err := c.db.Where("course_name = ?", req.CourseName).First(&course).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.DashboardResponse{}, fmt.Errorf("course not found: %s", req.CourseName)
		}
		return schema.DashboardResponse{}, fmt.Errorf("database error: %w", err)
	}

	var professorName string

	if err := c.db.Table("professor_data").Select("name").Where("professor_id = ?", course.ProfessorID).Scan(&professorName).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.DashboardResponse{}, fmt.Errorf("prof not found")
		}
		return schema.DashboardResponse{}, fmt.Errorf("database error: %w", err)
	}

	return schema.DashboardResponse{
		Description: course.Description,
		Name:        course.CourseName,
		Type:        course.Type,
		Professor:   professorName,
	}, nil
}

func (c *CoursesRepository) GetCourseLessons(req schema.LessonsRequest) (schema.LessonsResponse, error) {
	var courseID int

	if err := c.db.Table("courses").Select("id").Where("course_name = ?", req.CourseName).Scan(&courseID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.LessonsResponse{}, fmt.Errorf("course not found: %s", req.CourseName)
		}
		return schema.LessonsResponse{}, fmt.Errorf("database error: %w", err)
	}

	var lessons []schema.Lesson
	if err := c.db.Where("course_id = ?", courseID).Find(&lessons).Error; err != nil {
		return schema.LessonsResponse{}, fmt.Errorf("failed to fetch lessons: %w", err)
	}

	lessonResps := make([]schema.LessonResp, len(lessons))
	for i, lesson := range lessons {
		lessonResps[i] = schema.LessonResp{
			Name:        lesson.LessonName,
			Description: lesson.Description,
		}
	}

	return schema.LessonsResponse{
		Lessons: lessonResps,
	}, nil

}

func (c *CoursesRepository) GetCourseLesson(req schema.LessonReq) (schema.LessonResp, error) {
	var course schema.Course

	if err := c.db.Where("course_name = ?", req.CourseName).First(&course).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.LessonResp{}, fmt.Errorf("course with name %s not found", req.CourseName)
		}
		return schema.LessonResp{}, fmt.Errorf("database error: %w", err)
	}

	var lesson schema.Lesson

	if err := c.db.Where("course_id = ? and lesson_name = ?", course.ID, req.LessonName).First(&lesson).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.LessonResp{}, fmt.Errorf("course with name %s not found", req.CourseName)
		}
		return schema.LessonResp{}, fmt.Errorf("database error: %w", err)
	}

	return schema.LessonResp{Description: lesson.Description, Name: lesson.LessonName}, nil
}

func (c *CoursesRepository) SignupCourse(req schema.SignupCourseReq) (schema.SignupCourseResp, error) {
	var student schema.Student

	if err := c.db.Where("email = ?", req.Email).First(&student).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.SignupCourseResp{}, fmt.Errorf("student with email %s not found", req.Email)
		}
		return schema.SignupCourseResp{}, fmt.Errorf("database error: %w", err)
	}

	var course schema.Course

	if err := c.db.Where("course_name = ?", req.CourseName).First(&course).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return schema.SignupCourseResp{}, fmt.Errorf("course with name %s not found", req.CourseName)
		}
		return schema.SignupCourseResp{}, fmt.Errorf("database error: %w", err)
	}

	var newCr schema.UserCourse = schema.UserCourse{
		UserID:   student.ID,
		CourseID: course.ID,
	}

	if err := c.db.Create(&newCr).Error; err != nil {
		return schema.SignupCourseResp{}, fmt.Errorf("failed to add student in course: %w", err)
	}

	return schema.SignupCourseResp{CourseName: req.CourseName}, nil
}
