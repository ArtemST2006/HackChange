package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ArtemST2006/HackChange/internal/schema"
)

// Register godoc
// @Summary      Зарегестрировать пользователя
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		schema.RegistrationReq	true	"данные о пользователе"
// @Success		 201 	{object}	map[string]interface{} "id: идентификатор пользователя"
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/register [post]
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var input schema.RegistrationReq

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	var user schema.Student
	user.Email = input.Email
	user.HashPassword = input.HashedPassword
	user.UserName = input.Username

	var user_data schema.StudentData
	user_data.Name = input.Name
	user_data.StudentCards = input.StudentCard
	if input.DateOfBirth != "" {
		user_data.DateOfBirth = &input.DateOfBirth
	} else {
		user_data.DateOfBirth = nil
	}
	user_data.Course = input.Cource
	user_data.GPA = &input.GPA

	id, err := h.services.Authorization.CreateUser(user, user_data)
	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id": id,
	})
}

// Login godoc
// @Summary      Войти в систему
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		schema.LoginReq	true	"email и пароль"
// @Success		 200 	{object}	schema.LoginResp
// @Failure      404    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/login [post]
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var input schema.LoginReq

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	token, in, err := h.services.GetUserA(input.Email, input.HashedPassword)
	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	if in.ID == 0 {
		writeErrorResponse(w, http.StatusNotFound, "user not found")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"email":         in.Email,
		"token":         token.AccessToken,
		"refresh_token": token.RefreshToken,
	})
}

// RefreshToken godoc
// @Summary      Овновить JWT токен
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		map[string]string	true	"refresh_token"
// @Success		 201 	{object}	schema.RefreshResp
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/refresh [post]
func (h *Handler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	var input struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeErrorResponse(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if input.RefreshToken == "" {
		writeErrorResponse(w, http.StatusBadRequest, "refresh_token is required")
		return
	}

	token, err := h.services.Authorization.RefreshToken(input.RefreshToken)
	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token":         token.AccessToken,
		"refresh_token": token.RefreshToken,
	})
}

// Logout godoc
// @Summary      Выйти из системы
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		map[string]string	true	"refresh_token"
// @Success		 200 	{object}	map[string]interface{}
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/logout [post]
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	var input struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeErrorResponse(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if input.RefreshToken == "" {
		writeErrorResponse(w, http.StatusBadRequest, "refresh_token is required")
		return
	}

	err := h.services.Authorization.Logout(input.RefreshToken)
	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "user logged out",
	})
}
