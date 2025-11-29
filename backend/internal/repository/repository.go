// internal/repository/repository.go

package repository

import (
	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

// === Интерфейсы ===

type Authorization interface {
	//TODO methods for authorization
}

type Comment interface {
	CreateCourseComment(comment *schema.CommentCourse) error
	GetCourseCommentsByCourseID(courseID uint) ([]schema.CommentCourseWithUser, error)
	CreateLessonComment(comment *schema.CommentLesson) error
	GetLessonCommentsByLessonID(lessonID uint) ([]schema.CommentLessonWithUser, error)
	CourseExists(courseID uint) (bool, error)
	LessonExists(lessonID uint) (bool, error)
}

// === Основная структура ===
type Repository struct {
	Authorization
	Comment
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		Authorization: nil, // пока заглушка
		Comment:       NewCommentPostgres(db),
	}
}
