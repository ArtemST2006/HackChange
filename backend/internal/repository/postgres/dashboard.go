package postgres

import (
	"fmt"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type dashboardRepository struct {
	db *gorm.DB
}

// Возвращаем СТРУКТУРУ, а не интерфейс!
func NewDashboardRepository(db *gorm.DB) *dashboardRepository {
	return &dashboardRepository{db: db}
}

// собирает все данные для dashboard
func (r *dashboardRepository) GetMainDashboardData(userID uint) (*schema.MainDashboardResponse, error) {
	name, err := r.getStudentName(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get student name: %w", err)
	}

	activeCourses, err := r.getActiveCoursesCount(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get active courses: %w", err)
	}

	pendingAssignments, err := r.getPendingAssignmentsCount(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get pending assignments: %w", err)
	}

	overallProgress, err := r.getOverallProgress(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get overall progress: %w", err)
	}

	continueLearning, err := r.getContinueLearning(userID)
	if err != nil {
		continueLearning = nil
	}

	topCourses, err := r.getTopCourses()
	if err != nil {
		return nil, fmt.Errorf("failed to get top courses: %w", err)
	}

	categories, err := r.getCategories()
	if err != nil {
		return nil, fmt.Errorf("failed to get categories: %w", err)
	}

	return &schema.MainDashboardResponse{
		User: schema.DashboardUser{
			Name: name,
		},
		Stats: schema.DashboardStats{
			ActiveCourses:      activeCourses,
			PendingAssignments: pendingAssignments,
			OverallProgress:    overallProgress,
			StreakDays:         0, // заглушка (надо по идее бд поправить, я не стал)
		},
		ContinueLearning: continueLearning,
		TopCourses:       topCourses,
		Categories:       categories,
	}, nil
}

// --- Вспомогательные методы ---

func (r *dashboardRepository) getStudentName(userID uint) (string, error) {
	var name string
	err := r.db.Table("student_data").
		Select("name").
		Where("user_id = ?", userID).
		Scan(&name).Error
	if err != nil {
		return "", err
	}
	if name == "" {
		var userName string
		err = r.db.Table("student").
			Select("user_name").
			Where("id = ?", userID).
			Scan(&userName).Error
		if err != nil {
			return "", err
		}
		name = userName
	}
	return name, nil
}

func (r *dashboardRepository) getActiveCoursesCount(userID uint) (int, error) {
	var count int64
	err := r.db.Table("user_course").
		Where("user_id = ?", userID).
		Count(&count).Error
	return int(count), err
}

func (r *dashboardRepository) getPendingAssignmentsCount(userID uint) (int, error) {
	var count int64
	err := r.db.Table("homework").
		Where("student_id = ? AND mark_id IS NULL", userID).
		Count(&count).Error
	return int(count), err
}

func (r *dashboardRepository) getOverallProgress(userID uint) (int, error) {
	var totalHomework int64
	err := r.db.Table("lessons l").
		Joins("JOIN user_course uc ON l.course_id = uc.course_id").
		Where("uc.user_id = ? AND l.homework = true", userID).
		Count(&totalHomework).Error
	if err != nil {
		return 0, err
	}
	if totalHomework == 0 {
		return 0, nil
	}

	var submittedHomework int64
	err = r.db.Table("homework h").
		Joins("JOIN lessons l ON h.lesson_id = l.id").
		Joins("JOIN user_course uc ON l.course_id = uc.course_id").
		Where("uc.user_id = ? AND h.mark_id IS NOT NULL", userID).
		Count(&submittedHomework).Error
	if err != nil {
		return 0, err
	}

	progress := int((float64(submittedHomework) / float64(totalHomework)) * 100)
	return progress, nil
}

func (r *dashboardRepository) getContinueLearning(userID uint) (*schema.CourseLesson, error) {
	var lastLessonID uint
	err := r.db.Table("homework").
		Select("lesson_id").
		Where("student_id = ? AND mark_id IS NOT NULL", userID).
		Order("id DESC").
		Limit(1).
		Scan(&lastLessonID).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return r.getFirstLesson(userID)
		}
		return nil, err
	}

	var currentLesson schema.Lesson
	if err := r.db.First(&currentLesson, lastLessonID).Error; err != nil {
		return nil, err
	}

	var nextLesson schema.Lesson
	err = r.db.Where("course_id = ? AND id > ?", currentLesson.CourseID, lastLessonID).
		Order("id ASC").
		Limit(1).
		Find(&nextLesson).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			nextLesson = currentLesson
		} else {
			return nil, err
		}
	}

	var courseName string
	err = r.db.Table("courses").
		Select("course_name").
		Where("id = ?", nextLesson.CourseID).
		Scan(&courseName).Error
	if err != nil {
		return nil, err
	}

	return &schema.CourseLesson{
		CourseID:   nextLesson.CourseID,
		CourseName: courseName,
		LessonID:   nextLesson.ID,
		LessonName: nextLesson.LessonName,
		Progress:   0,
	}, nil
}

func (r *dashboardRepository) getFirstLesson(userID uint) (*schema.CourseLesson, error) {
	var courseID uint
	err := r.db.Table("user_course").
		Select("course_id").
		Where("user_id = ?", userID).
		Order("course_id ASC").
		Limit(1).
		Scan(&courseID).Error
	if err != nil {
		return nil, err
	}

	var lesson schema.Lesson
	err = r.db.Where("course_id = ?", courseID).
		Order("id ASC").
		Limit(1).
		Find(&lesson).Error
	if err != nil {
		return nil, err
	}

	var courseName string
	err = r.db.Table("courses").
		Select("course_name").
		Where("id = ?", courseID).
		Scan(&courseName).Error
	if err != nil {
		return nil, err
	}

	return &schema.CourseLesson{
		CourseID:   courseID,
		CourseName: courseName,
		LessonID:   lesson.ID,
		LessonName: lesson.LessonName,
		Progress:   0,
	}, nil
}

func (r *dashboardRepository) getTopCourses() ([]schema.CoursePreview, error) {
	var courses []struct {
		ID          uint
		CourseName  string
		Description string
		ProfessorID uint
		Students    int64
	}

	err := r.db.Table("courses c").
		Select("c.id, c.course_name, c.description, c.professor_id, COUNT(uc.user_id) as students").
		Joins("LEFT JOIN user_course uc ON c.id = uc.course_id").
		Group("c.id, c.course_name, c.description, c.professor_id").
		Order("students DESC").
		Limit(3).
		Scan(&courses).Error
	if err != nil {
		return nil, err
	}

	professorMap := make(map[uint]string)
	for _, c := range courses {
		if _, exists := professorMap[c.ProfessorID]; !exists {
			var profName string
			r.db.Table("professor").
				Select("username").
				Where("id = ?", c.ProfessorID).
				Scan(&profName)
			professorMap[c.ProfessorID] = profName
		}
	}

	var result []schema.CoursePreview
	for _, c := range courses {
		result = append(result, schema.CoursePreview{
			CourseID:    c.ID,
			CourseName:  c.CourseName,
			Description: c.Description,
			Professor:   professorMap[c.ProfessorID],
		})
	}
	return result, nil
}

func (r *dashboardRepository) getCategories() ([]schema.CategoryPreview, error) {
	rows, err := r.db.Raw(`
		SELECT type, COUNT(*) as course_count
		FROM courses 
		WHERE type IS NOT NULL AND type != ''
		GROUP BY type
	`).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []schema.CategoryPreview
	id := uint(1)
	for rows.Next() {
		var name string
		var count int64
		if err := rows.Scan(&name, &count); err != nil {
			return nil, err
		}
		categories = append(categories, schema.CategoryPreview{
			ID:          id,
			Name:        name,
			CourseCount: int(count),
		})
		id++
	}
	return categories, nil
}
