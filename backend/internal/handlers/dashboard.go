package handlers

import (
	"net/http"
)

// GetDashboard godoc
// @Summary      Получить главную страницу
// @Tags		 dashboard
// @Accept       json
// @Produce      json
// @Success		 200 	{object}	schema.DashboardResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /user/dashboard [get]
func (h *Handler) GetDashboard(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}