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
// @Param        body	body		schema.RegistrationReq	true	"данные о пользователе"
// @Success		 201 	{object}	map[string]interface{} "id: идентификатор пользователя"
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/register [post]
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var input schema.RegistrationReq

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var user schema.Student
	user.Email = input.Email
	user.HashPassword = input.HashedPassword
	user.UserName = input.Username
<<<<<<< HEAD

	var user_data schema.StudentData
	user_data.Name = input.Name
	user_data.StudentCards = input.StudentCard
	user_data.DateOfBirth = &input.DateOfBirth
	user_data.Course = input.Cource
	user_data.GPA = &input.GPA
	
	

	id , err := h.services.Authorization.CreateUser(user, user_data)
=======
	

	id , err := h.services.Authorization.CreateUser(user)
>>>>>>> origin/Front_bombas
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
// @Param        body	body		schema.LoginReq	true	"email и пароль"
// @Success		 200 	{object}	schema.LoginResp
// @Failure      404    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/login [post]
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var input schema.LoginReq

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, in, err := h.services.GetUserA(input.Email, input.HashedPassword) 
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
// @Success		 201 	{object}	schema.RefreshResp
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/refresh [post]
func (h *Handler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		http.Error(w, "refresh token not found", http.StatusBadRequest)
		return
	}

	token,  err := h.services.Authorization.RefreshToken(cookie.Value)
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
		"token": token.AccessToken,
	})
}


// Logout godoc
// @Summary      Выйти из системы
// @Tags         auth
// @Accept       json
// @Produce      json
// @Success		 200 	{object}	map[string]interface{}
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /auth/logout [post]
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {


	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		http.Error(w, "refresh token not found", http.StatusBadRequest)
		return
	}
	err = h.services.Authorization.Logout(cookie.Value)
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "user logged out",
	})
	
}
