package postgres

import (
	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type commentPostgres struct {
	db *gorm.DB
}

func NewCommentPostgres(db *gorm.DB) *commentPostgres {
	return &commentPostgres{db: db}
}

// --- Реализация интерфейса Comment ---

func (c *commentPostgres) CreateCourseComment(comment *schema.CommentCourse) error {
	return c.db.Create(comment).Error
}

func (c *commentPostgres) GetCourseCommentsByCourseID(courseID uint) ([]schema.CommentCourseWithUser, error) {
	var comments []schema.CommentCourseWithUser
	err := c.db.
		Select("comments_courses.id, comments_courses.user_id, comments_courses.course_id, comments_courses.comment, comments_courses.created_at, student.user_name").
		Joins("JOIN student ON comments_courses.user_id = student.id").
		Where("comments_courses.course_id = ?", courseID).
		Find(&comments).Error
	return comments, err
}

func (c *commentPostgres) CreateLessonComment(comment *schema.CommentLesson) error {
	return c.db.Create(comment).Error
}

func (c *commentPostgres) GetLessonCommentsByLessonID(lessonID uint) ([]schema.CommentLessonWithUser, error) {
	var comments []schema.CommentLessonWithUser
	err := c.db.
		Select("comments_lessons.id, comments_lessons.user_id, comments_lessons.lesson_id, comments_lessons.comment, comments_lessons.created_at, student.user_name").
		Joins("JOIN student ON comments_lessons.user_id = student.id").
		Where("comments_lessons.lesson_id = ?", lessonID).
		Find(&comments).Error
	return comments, err
}

func (c *commentPostgres) CourseExists(courseID uint) (bool, error) {
	var count int64
	err := c.db.Model(&schema.Course{}).Where("id = ?", courseID).Count(&count).Error
	return count > 0, err
}

func (c *commentPostgres) LessonExists(lessonID uint) (bool, error) {
	var count int64
	err := c.db.Model(&schema.Lesson{}).Where("id = ?", lessonID).Count(&count).Error
	return count > 0, err
}
