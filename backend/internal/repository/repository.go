package repository

import (
	"gorm.io/gorm"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type Authorization interface{
	//TODO methods for authorization
}

type User interface{
	GetUser(uint) (*schema.Student, *schema.StudentData, error)
	UpdateUser(userID uint, user *schema.StudentProfile) error
	GetUserCourses(userID uint) (*[]schema.CourseDB, error)
	UserChangePass(userID uint, passwords *schema.UserChangePassReq) error
}



type Repository struct{
	Authorization 
	User
}


func NewRepository(db *gorm.DB) *Repository{
	//TODO implement repositories
	return &Repository{
		Authorization: nil,
		User: NewUserRepo(db),
	}
}

