package postgres

import (
	"github.com/ArtemST2006/HackChange/internal/schema"
	"gorm.io/gorm"
)

type AuthPostgres struct {
	db *gorm.DB
}

func NewAuthPostgres(db *gorm.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(student schema.Student, student_data schema.StudentData) (uint, error) {
	tx := r.db.Begin()
	defer func() {
		if s := recover(); s != nil {
			tx.Rollback()
		}
	}()

	result := tx.Create(&student)
	if err := result.Error; err != nil {
		tx.Rollback()
		return 0, err
	}

	student_data.UserID = student.ID

	result = tx.Create(&student_data)
	if err := result.Error; err != nil {
		tx.Rollback()
		return 0, err
	}

	result = tx.Commit()
	if err := result.Error; err != nil {
		return 0, err
	}

	return student.ID, nil
}

func (r *AuthPostgres) GetUser(email string) (*schema.Student, error) {
	var user schema.Student
	result := r.db.Where("email = ?", email).Find(&user)
	return &user, result.Error
}


func (r *AuthPostgres) CreateRefreshToken(token schema.RefreshToken) error {
	result := r.db.Create(&token)
	if err := result.Error; err != nil {
		return err
	}
	return nil
}

func (r *AuthPostgres) GetValidRefreshToken(hash string) (*schema.RefreshToken, error) {
	var token schema.RefreshToken
	result := r.db.Where("token_hash = ? AND revoked = ? AND expires_at > NOW()", hash, false).First(&token)
	return &token, result.Error
}

func (r *AuthPostgres) RevokeRefreshToken(id uint) error{
	result := r.db.Model(&schema.RefreshToken{}).Where("id = ?", id).Update("revoked", true)
	return result.Error
}

func (r *AuthPostgres) RevokeAllRefreshTokens(hash string) error {
	var token schema.RefreshToken

	err := r.db.Select("user_id").Where("token_hash = ?", hash).First(&token)
	if err != nil{
		return nil
	}

	return r.db.Model(schema.RefreshToken{}).Where("user_id = ? AND revoked = false", token.UserID).Update("revoked", true).Error
}