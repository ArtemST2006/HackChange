package handler

import (
	"net/http"

	"github.com/ArtemST2006/HackChange/internal/service"
)


type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		services: services,
	}
}

func (h *Handler) InitRoutes() http.Handler {
	panic("implement me")
}

