package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ArtemST2006/HackChange/internal/schema"
)

func writeErrorResponse(w http.ResponseWriter, code int, err string) {
	strErr := schema.ErrorResponse{}
	strErr.Error.Code = code
	strErr.Error.Message = err

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(strErr)
}
