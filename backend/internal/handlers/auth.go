package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ArtemST2006/HackChange/internal/schema"
)


type RefreshReq struct{
	Email string        `json:"email"`
	RefreshToken string `json:"refresh_token"`
}

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
	var input schema.Student

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id , err := h.services.Authorization.CreateUser(input)
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
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
// @Param        body	body		entities.LoginReq	true	"email и пароль"
// @Success		 200 	{object}	entities.LoginResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /auth/login [post]
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var input schema.Student

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, in, err := h.services.GetUser(input.Email, input.HashPassword) 
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if in.ID == 0{
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	http.SetCookie(w, &http.Cookie{
		Name: "refresh_token",
		Value: token.RefreshToken,
		Path: "/",
		Expires: time.Now().Add(7 * 24 * time.Hour),
		HttpOnly: true,
		Secure:   true,
	})
	json.NewEncoder(w).Encode(map[string]interface{}{
		"email": in.Email,
		"token": token.AccessToken,
	})
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
	var input RefreshReq

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token,  err := h.services.Authorization.RefreshToken(input.RefreshToken)
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	http.SetCookie(w, &http.Cookie{
		Name: "refresh_token",
		Value: token.RefreshToken,
		Path: "/",
		Expires: time.Now().Add(7 * 24 * time.Hour),
		HttpOnly: true,
		Secure:   true,
	})
	json.NewEncoder(w).Encode(map[string]interface{}{
		"email": input.Email,
		"token": token.AccessToken,
	})
}


// Logout godoc
// @Summary      Выйти из системы
// @Tags         auth
// @Accept       json
// @Produce      json
// @Success		 200 	{object}	entities.LogoutResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /auth/logout [post]
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {


	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		http.Error(w, "refresh token not found", http.StatusBadRequest)
		return
	}
	err = h.services.Authorization.Logout(cookie.Value)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "user logged out",
	})
	
}