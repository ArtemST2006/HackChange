package postgres

import (
	"github.com/ArtemST2006/HackChange/internal/schema"

	"errors"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (r *UserRepo) GetUser(userID uint) (*schema.Student, *schema.StudentData, error) {
	var student schema.Student
	if err := r.db.Where("id = ?", userID).First(&student).Error; err != nil {
		return nil, nil, err
	}

	var studentData schema.StudentData
	if err := r.db.Where("user_id = ?", userID).First(&studentData).Error; err != nil {
		return nil, nil, err
	}

	return &student, &studentData, nil
}

func (r *UserRepo) UpdateUser(userID uint, user *schema.StudentProfile) error {
	tx := r.db.Begin()
	defer func() {
		if s := recover(); s != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Model(&schema.Student{}).Where("id = ?", userID).Update("user_name", user.Student.Username).Error; err != nil {
		tx.Rollback()
		return err
	}

	var studentData schema.StudentData
	if err := tx.Where("user_id = ?", userID).First(&studentData).Error; err != nil {
		tx.Rollback()
		return err
	}

	studentData.DateOfBirth = user.StudentData.DateOfBirth
	studentData.Name = user.StudentData.Name

	if err := tx.Model(&studentData).Updates(&studentData).Error; err != nil {
		return err
	}

	return tx.Commit().Error
}

func (r *UserRepo) GetUserCourses(userID uint) (*[]schema.CourseDB, error) {
	var courses []schema.CourseDB
	query := `
			SELECT c.course_name, c.type, c.description, p.username as professor_name
			FROM courses c
			INNER JOIN user_course uc ON c.id = uc.course_id
			INNER JOIN professor p ON c.professor_id = p.id
			WHERE uc.user_id = ?
		`

	result := r.db.Raw(query, userID).Scan(&courses)
	if result.Error != nil {
		return nil, result.Error
	}

	return &courses, nil
}

func (r *UserRepo) UserChangePass(userID uint, passwords *schema.UserChangePassReq) error {
	var student schema.Student
	if err := r.db.Where("id = ?", userID).First(&student).Error; err != nil {
		return err
	}
	err := bcrypt.CompareHashAndPassword([]byte(student.HashPassword), []byte(passwords.OldPassword))

	if student.Email != passwords.Email || err != nil {
		err := errors.New("invalid email or password")
		return err
	}

	hash, _ := r.GenerateHashPassword(passwords.NewPassword)

	if err := r.db.Model(&student).Update("hash_password", hash).Error; err != nil {
		return err
	}

	return nil
}

func (r *UserRepo) GenerateHashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost) // австоматически генерирует соль
	if err != nil {
		return "", err
	}
	return string(hash), nil
}
