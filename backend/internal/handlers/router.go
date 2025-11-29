package handlers

import (
	"net/http"
	"time"

	service "github.com/ArtemST2006/HackChange/internal/services"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
	httpSwagger "github.com/swaggo/http-swagger"
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

	r.Use(cors.Handler(cors.Options{
	AllowedOrigins:   []string{"*"},
	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
	ExposedHeaders:   []string{"Link"},
	AllowCredentials: true,
	MaxAge:           300,
	}))
	// Хрен знает правльно ли я написал роуты, но вроде так должно работать (Это все андрей)
	// Артем, проверь особенно get запросы(нужны ли они)
	r.Get("/swagger/*", httpSwagger.Handler())

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
	
	r.Route("/course", func(course chi.Router) {
		h.authMiddleware(course)
		course.Get("/dashboard", h.GetCourseDashboard)
		course.Get("/lessons", h.GetCourseLessons)
		course.Get("/lesson", h.GetCourseLesson)
		course.Post("/lesson/signup", h.SignupCourse)
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
