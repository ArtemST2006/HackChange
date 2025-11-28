package server

import (
	"context"
	"fmt"
	"net/http"
	"time"
)


type Server struct {
	server *http.Server
}

func (s *Server) Start(port string, handler http.Handler) error {
	s.server = &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		MaxHeaderBytes: 1 << 20,

	}

	return s.server.ListenAndServe()
}

func (s *Server) Shutdown(context context.Context) error {
	return s.server.Shutdown(context)
}

