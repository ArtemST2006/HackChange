package impl

import (
	"errors"
	"time"

	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type CommentService interface {
	CreateCourseComment(userID, courseID uint, commentText string) error
	GetCourseComments(courseID uint) ([]schema.CommentResp, error)
	CreateLessonComment(userID, lessonID uint, commentText string) error
	GetLessonComments(lessonID uint) ([]schema.CommentResp, error)
}

type commentService struct {
	repo repository.Comment
}

func NewCommentService(repo repository.Comment) CommentService {
	return &commentService{repo: repo}
}

func (s *commentService) CreateCourseComment(userID, courseID uint, commentText string) error {
	if courseID == 0 || commentText == "" {
		return errors.New("course_id and comment text are required")
	}

	exists, err := s.repo.CourseExists(courseID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("course not found")
	}

	comment := &schema.CommentCourse{
		UserID:    userID,
		CourseID:  courseID,
		Comment:   commentText,
		CreatedAt: time.Now(),
	}

	return s.repo.CreateCourseComment(comment)
}

func (s *commentService) GetCourseComments(courseID uint) ([]schema.CommentResp, error) {
	if courseID == 0 {
		return nil, errors.New("course_id is required")
	}

	dbComments, err := s.repo.GetCourseCommentsByCourseID(courseID)
	if err != nil {
		return nil, err
	}

	var resp []schema.CommentResp
	for _, c := range dbComments {
		resp = append(resp, schema.CommentResp{
			ID:        c.ID,
			Comment:   c.Comment,
			Username:  c.UserName,
			UserID:    c.UserID,
			CreatedAt: c.CreatedAt.Format(time.RFC3339),
		})
	}
	return resp, nil
}

func (s *commentService) CreateLessonComment(userID, lessonID uint, commentText string) error {
	if lessonID == 0 || commentText == "" {
		return errors.New("lesson_id and comment text are required")
	}

	exists, err := s.repo.LessonExists(lessonID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("lesson not found")
	}

	comment := &schema.CommentLesson{
		UserID:    userID,
		LessonID:  lessonID,
		Comment:   commentText,
		CreatedAt: time.Now(),
	}

	return s.repo.CreateLessonComment(comment)
}

func (s *commentService) GetLessonComments(lessonID uint) ([]schema.CommentResp, error) {
	if lessonID == 0 {
		return nil, errors.New("lesson_id is required")
	}

	dbComments, err := s.repo.GetLessonCommentsByLessonID(lessonID)
	if err != nil {
		return nil, err
	}

	var resp []schema.CommentResp
	for _, c := range dbComments {
		resp = append(resp, schema.CommentResp{
			ID:        c.ID,
			Comment:   c.Comment,
			Username:  c.UserName,
			UserID:    c.UserID,
			CreatedAt: c.CreatedAt.Format(time.RFC3339),
		})
	}
	return resp, nil
}
