package repository

import "gorm.io/gorm"

type Authorization interface{
	//TODO methods for authorization
}


type Repository struct{
	Authorization 
}


func NewRepository(db *gorm.DB) *Repository{
	//TODO implement repositories
	return &Repository{
		Authorization: nil,
	}
}

