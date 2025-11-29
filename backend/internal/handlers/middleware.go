package handlers

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func (h *Handler) authMiddleware(r chi.Router) {
	r.Use(jwtauth.Verifier(h.services.Authorization.TokenStruct()))
	r.Use(jwtauth.Authenticator(h.services.Authorization.TokenStruct()))
}
