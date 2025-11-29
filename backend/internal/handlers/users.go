package handlers

import (
	"net/http"
)

// GetUserProfile godoc
// @Summary      Получить профиль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{object}	entities.UserProfile
// @Failure      401    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /user/profile [get]
func (h *Handler) GetUserProfile(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// EditUserProfile godoc
// @Summary      Изменить профиль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Param        body	body		entities.UserProfile	true	"Изменения профиля"
// @Success		 201 	{object}	entities.UserProfile
// @Failure      401    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /user/edit [put]
func (h *Handler) EditUserProfile(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}	

// UserCourses godoc
// @Summary      Получить курсы на которые записан пользователь
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{array}		entities.Course
// @Failure      401    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /user/courses [get]
func (h *Handler) GetUserCourses(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// UserChangePass godoc
// @Summary      Изменить пароль пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        Authorization	header	string	true	"Bearer"
// @Param        body	body		entities.UserChangePassReq	true	"Изменения пароля"
// @Success		 200 	{object}	entities.UserChangePassResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      401    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /user/change_pass [put]
func (h *Handler) UserChangePass(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}
