package impl

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type DashboardService interface {
	GetMainDashboard(userID uint) (*schema.MainDashboardResponse, error)
}

type dashboardService struct {
	repo repository.Dashboard
}

func NewDashboardService(repo repository.Dashboard) DashboardService {
	return &dashboardService{repo: repo}
}

func (s *dashboardService) GetMainDashboard(userID uint) (*schema.MainDashboardResponse, error) {
	return s.repo.GetMainDashboardData(userID)
}
