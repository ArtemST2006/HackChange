package handlers

import (
	"net/http"
)

// GetDashboard godoc
// @Summary      Получить главную страницу студента (дашборд)
// @Tags         dashboard
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer токен"
// @Success      200            {object}	schema.MainDashboardResponse
// @Failure      401            {object}	schema.ErrorResponse
// @Failure      500            {object}	schema.ErrorResponse
// @Router       /dashboard [get]
func (h *Handler) GetDashboard(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		h.respondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	dashboard, err := h.services.DashboardService.GetMainDashboard(userID)
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to load dashboard data")
		return
	}

	h.respondWithJSON(w, http.StatusOK, dashboard)
}
