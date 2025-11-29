package handlers

import (
	"net/http"

	"encoding/json"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/go-chi/jwtauth/v5"
)

// GetUserProfile godoc
// @Summary      Получить профиль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{object}	schema.StudentProfile
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /user/profile [get]
func (h *Handler) GetUserProfile(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	studentID := uint(claims["user_id"].(uint))

	profile, err := h.services.User.GetUser(studentID)
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}

// EditUserProfile godoc
// @Summary      Изменить профиль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Param        body	body		schema.StudentProfile	true	"Изменения профиля"
// @Success		 200 	{object}	map[string]interface{} "id: идентификатор пользователя"
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /user/edit [put]
func (h *Handler) EditUserProfile(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	studentID := uint(claims["user_id"].(uint))

	var updateData schema.StudentProfile
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusBadRequest
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	resp, err := h.services.User.UpdateUser(studentID, &updateData)
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id": resp,
	})
}

// UserCourses godoc
// @Summary      Получить курсы на которые записан пользователь
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{array}		schema.CourseDB
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /user/courses [get]
func (h *Handler) GetUserCourses(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	studentID := uint(claims["user_id"].(uint))

	courses, err := h.services.User.GetUserCourses(studentID)
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(courses)
}

// UserChangePass godoc
// @Summary      Изменить пароль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Param        body	body		schema.UserChangePassReq	true	"Изменения пароля"
// @Success		 200 	{object}	map[string]interface{} "id: идентификатор пользователя"
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /user/change_pass [put]
func (h *Handler) UserChangePass(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	studentID := uint(claims["user_id"].(uint))

	var updateData schema.UserChangePassReq
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusBadRequest
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	resp, err := h.services.User.UserChangePass(studentID, &updateData)
	if err != nil {
		var resp schema.ErrorResponse
		resp.Error.Code = http.StatusInternalServerError
		resp.Error.Message = "ошибка"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.Error.Code)
		json.NewEncoder(w).Encode(resp)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id": resp,
	})
}
