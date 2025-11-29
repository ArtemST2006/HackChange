package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ArtemST2006/HackChange/internal/schema"
)

// GetAllCourses godoc
// @Summary      Получить все курсы
// @Tags         cources
// @Accept       json
// @Produce      json
// @Success		 200 	{array}		entities.Course
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /courses [get]
func (h *Handler) GetAllCourses(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// GetCourseDashboard godoc
// @Summary      Получить главную страницу курса
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.CourseReq	true	"Информация о курсе"
// @Success		 200 	{object}	entities.Course
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/dashboard [get]
func (h *Handler) GetCourseDashboard(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

func (h *Handler) PostCourseComment(w http.ResponseWriter, r *http.Request) {
	var req schema.CourseCommentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if req.CourseName == "" || req.Comment == "" {
		h.respondWithError(w, http.StatusBadRequest, "course_name and comment are required")
		return
	}

	// Получаем user_id из контекста
	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		h.respondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	username, _ := r.Context().Value("username").(string) // можно тоже из токена

	// Здесь: сохранение в БД
	// commentID, err := h.DB.CreateCourseComment(req.CourseName, userID, req.Comment)
	// if err != nil { ... }
	// Пока заглушка
	newComment := schema.CommentResp{
		ID:        99,
		Comment:   req.Comment,
		Username:  username,
		UserID:    userID,
		CreatedAt: time.Now().Format(time.RFC3339),
	}

	response := schema.CourseCommentsResponse{
		Success:  true,
		Comments: []schema.CommentResp{newComment},
	}

	h.respondWithJSON(w, http.StatusCreated, response)
}

func (h *Handler) GetCourseComment(w http.ResponseWriter, r *http.Request) {
	courseName := r.URL.Query().Get("course_name")
	if courseName == "" {
		h.respondWithError(w, http.StatusBadRequest, "course_name is required")
		return
	}

	// Здесь будет вызов БД: comments, err := h.DB.GetCourseComments(courseName)
	// Пока заглушка:
	comments := []schema.CommentResp{
		{
			ID:        1,
			Comment:   "Отличный курс по математике!",
			Username:  "student1",
			UserID:    101,
			CreatedAt: time.Now().Format(time.RFC3339),
		},
		{
			ID:        2,
			Comment:   "Много домашки, но полезно.",
			Username:  "student2",
			UserID:    102,
			CreatedAt: time.Now().Add(-24 * time.Hour).Format(time.RFC3339),
		},
	}

	response := schema.CourseCommentsResponse{
		Success:  true,
		Comments: comments,
	}

	h.respondWithJSON(w, http.StatusOK, response)
}

// GetCourseLessons godoc
// @Summary      Получить все уроки курса
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.CourseReq	true	"Информация о курсе"
// @Success		 200 	{array}		entities.LessonResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lessons [get]
func (h *Handler) GetCourseLessons(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// GetCourseLessons godoc
// @Summary      Получить урок курса
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.LessonReq	true	"Информация об уроке"
// @Success		 200 	{object}	entities.LessonResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson [get]
func (h *Handler) GetCourseLesson(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

func (h *Handler) PostLessonComment(w http.ResponseWriter, r *http.Request) {
	var req schema.LessonCommentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if req.LessonName == "" || req.Comment == "" {
		h.respondWithError(w, http.StatusBadRequest, "lesson_name and comment are required")
		return
	}

	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		h.respondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	username, _ := r.Context().Value("username").(string)

	// Сохранение в БД (заглушка)
	newComment := schema.CommentResp{
		ID:        42,
		Comment:   req.Comment,
		Username:  username,
		UserID:    userID,
		CreatedAt: time.Now().Format(time.RFC3339),
	}

	response := schema.LessonCommentsResponse{
		Success:  true,
		Comments: []schema.CommentResp{newComment},
	}

	h.respondWithJSON(w, http.StatusCreated, response)
}

func (h *Handler) GetLessonComment(w http.ResponseWriter, r *http.Request) {
	lessonName := r.URL.Query().Get("lesson_name")
	if lessonName == "" {
		h.respondWithError(w, http.StatusBadRequest, "lesson_name is required")
		return
	}

	// Заглушка
	comments := []schema.CommentResp{
		{
			ID:        1,
			Comment:   "Сложная тема, но лектор объяснил хорошо.",
			Username:  "student3",
			UserID:    103,
			CreatedAt: time.Now().Format(time.RFC3339),
		},
	}

	response := schema.LessonCommentsResponse{
		Success:  true,
		Comments: comments,
	}

	h.respondWithJSON(w, http.StatusOK, response)
}

// SignupCourse godoc
// @Summary      Заерегистрироваться на курс
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.SignupCourseReq	true	"Регистрация на курс"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	entities.SignupCourseResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson/sign_up [post]
func (h *Handler) SignupCourse(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// GetHomework godoc
// @Summary      Получить домашнюю работу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.HomeworkReq	true	"Данные о домашней работе"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{array}		entities.HomeworkResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson/homework [get]
func (h *Handler) GetHomework(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// PostHomework godoc
// @Summary      Отправить домашнюю работу
// @Tags         cources
// @Accept       multipart/form-data
// @Produce      json
// @Param		 file    formData  	file      				true   "Файл для загрузки ??? хз как"
// @Param 		 HW_data formData 	entities.HomeworkPost	true   "Данные о домашней работе"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	entities.HomeworkResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson/homework [post]
func (h *Handler) PostHomework(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// ---------------------- Вспомогательные методы ----------------------
func (h *Handler) respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}

func (h *Handler) respondWithError(w http.ResponseWriter, code int, message string) {
	resp := schema.ErrorResponse{}
	resp.Error.Code = code
	resp.Error.Message = message
	h.respondWithJSON(w, code, resp)
}
