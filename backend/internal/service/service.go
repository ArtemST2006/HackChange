package service

import "github.com/ArtemST2006/HackChange/internal/repository"

type Authorization interface{
	//TODO methods for authorization
}

type Service struct{
	Authorization
}

func NewService(repo *repository.Repository) *Service{
	//TODO implement services
	return &Service{
		Authorization: nil,
	}
}

