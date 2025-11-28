package handlers

import (
	"net/http"
)


// Register godoc
// @Summary      Зарегестрировать пользователя
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		entities.RegistrationReq	true	"данные о пользователе"
// @Success		 201 	{object}	entities.RegistrationResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /auth/register [post]
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {

}

// Login godoc
// @Summary      Войти в систему
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		entities.LoginReq	true	"email и пароль"
// @Success		 200 	{object}	entities.LoginResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /auth/login [post]
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {

}


// RefreshToken godoc
// @Summary      Овновить JWT токен
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body	body		entities.RefreshReq	true	"JWT refresh"
// @Success		 201 	{object}	entities.RefreshResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /auth/refresh [post]
func (h *Handler) RefreshToken(w http.ResponseWriter, r *http.Request) {

}