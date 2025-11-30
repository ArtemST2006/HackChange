package handlers

import (
	"net/http"
	"time"

	service "github.com/ArtemST2006/HackChange/internal/services"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		services: services,
	}
}

func (h *Handler) InitRoutes() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(httprate.LimitByIP(100, 1*time.Minute)) // Rate limit middleware

	// Simple CORS middleware: echo back Origin and respond to OPTIONS.
	// Note: this allows any origin and is intended for development/demo only.
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")
			if origin != "" {
				// Set permissive CORS headers
				w.Header().Set("Access-Control-Allow-Origin", origin)
				// Keep Vary header for proxies
				w.Header().Add("Vary", "Origin")
				w.Header().Set("Access-Control-Allow-Credentials", "true")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type")
			}

			if r.Method == http.MethodOptions {
				// Preflight request — respond immediately
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	})
	// Хрен знает правльно ли я написал роуты, но вроде так должно работать (Это все андрей)
	// Артем, проверь особенно get запросы(нужны ли они)
	// r.Get("/swagger/*", httpSwagger.Handler())

	r.Route("/auth", func(auth chi.Router) {
		auth.Post("/register", h.Register)
		auth.Post("/login", h.Login)
		auth.Post("/logout", h.Logout)
		auth.Post("/refresh", h.RefreshToken)
	})

	r.Route("/user", func(user chi.Router) {
		h.authMiddleware(user) // Вроде должен работать(гребаный chi)
		user.Get("/profile", h.GetUserProfile)
		user.Put("/profile", h.EditUserProfile)
		user.Put("/password", h.UserChangePass)
		user.Get("/courses", h.GetUserCourses)
	})

	r.Get("/dashboard", h.GetDashboard)
	r.Get("/courses", h.GetAllCourses)

	// Public course signup endpoint (no auth required)
	r.Post("/course/lesson/signup", h.SignupCourse)

	r.Route("/course", func(course chi.Router) {
		h.authMiddleware(course)
		course.Get("/dashboard", h.GetCourseDashboard) // art
		course.Get("/lessons", h.GetCourseLessons)     // art
		course.Get("/lesson", h.GetCourseLesson)       // art
		course.Get("/comment", h.GetCourseComment)
		course.Post("/comment", h.PostCourseComment)
	})

	r.Route("/lesson", func(lesson chi.Router) {
		h.authMiddleware(lesson)
		lesson.Get("/comment", h.GetLessonComment)
		lesson.Post("/comment", h.PostLessonComment)
		lesson.Get("/homework", h.GetHomework)
		lesson.Post("/homework", h.PostHomework)
	})

	return r
}
