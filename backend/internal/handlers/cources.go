package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

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

// PostCourseComment godoc
// @Summary      Добавить комментарий к курсу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		schema.CourseCommentRequest	true	"Данные комментария"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	schema.CourseCommentsResponse
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      401    {object}	schema.ErrorResponse
// @Failure      404    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/comment [post]
func (h *Handler) PostCourseComment(w http.ResponseWriter, r *http.Request) {
	var req schema.CourseCommentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if req.CourseID == 0 || req.Comment == "" {
		h.respondWithError(w, http.StatusBadRequest, "course_id and comment are required")
		return
	}

	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		h.respondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	err := h.services.CommentService.CreateCourseComment(userID, req.CourseID, req.Comment)
	if err != nil {
		if err.Error() == "course not found" {
			h.respondWithError(w, http.StatusNotFound, err.Error())
		} else {
			h.respondWithError(w, http.StatusInternalServerError, "Failed to add comment")
		}
		return
	}

	comments, err := h.services.CommentService.GetCourseComments(req.CourseID)
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to fetch comments")
		return
	}

	response := schema.CourseCommentsResponse{
		Success:  true,
		Comments: comments,
	}
	h.respondWithJSON(w, http.StatusCreated, response)
}

// GetCourseComment godoc
// @Summary      Получить комментарии к курсу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        course_id	query		integer	true	"ID курса"
// @Success		 200 	{object}	schema.CourseCommentsResponse
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/comment [get]
func (h *Handler) GetCourseComment(w http.ResponseWriter, r *http.Request) {
	courseIDStr := r.URL.Query().Get("course_id")
	courseID, err := strconv.ParseUint(courseIDStr, 10, 32)
	if err != nil || courseID == 0 {
		h.respondWithError(w, http.StatusBadRequest, "valid course_id is required")
		return
	}

	comments, err := h.services.CommentService.GetCourseComments(uint(courseID))
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to fetch comments")
		return
	}

	h.respondWithJSON(w, http.StatusOK, schema.CourseCommentsResponse{
		Success:  true,
		Comments: comments,
	})
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

// GetCourseLesson godoc
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

// PostLessonComment godoc
// @Summary      Добавить комментарий к уроку
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		schema.LessonCommentRequest	true	"Данные комментария"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	schema.LessonCommentsResponse
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      401    {object}	schema.ErrorResponse
// @Failure      404    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /lesson/comment [post]
func (h *Handler) PostLessonComment(w http.ResponseWriter, r *http.Request) {
	var req schema.LessonCommentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondWithError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	if req.LessonID == 0 || req.Comment == "" {
		h.respondWithError(w, http.StatusBadRequest, "lesson_id and comment are required")
		return
	}

	userID, ok := r.Context().Value("user_id").(uint)
	if !ok {
		h.respondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	err := h.services.CommentService.CreateLessonComment(userID, req.LessonID, req.Comment)
	if err != nil {
		if err.Error() == "lesson not found" {
			h.respondWithError(w, http.StatusNotFound, err.Error())
		} else {
			h.respondWithError(w, http.StatusInternalServerError, "Failed to add comment")
		}
		return
	}

	comments, err := h.services.CommentService.GetLessonComments(req.LessonID)
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to fetch comments")
		return
	}

	response := schema.LessonCommentsResponse{
		Success:  true,
		Comments: comments,
	}
	h.respondWithJSON(w, http.StatusCreated, response)
}

// GetLessonComment godoc
// @Summary      Получить комментарии к уроку
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        lesson_id	query		integer	true	"ID урока"
// @Success		 200 	{object}	schema.LessonCommentsResponse
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /lesson/comment [get]
func (h *Handler) GetLessonComment(w http.ResponseWriter, r *http.Request) {
	lessonIDStr := r.URL.Query().Get("lesson_id")
	lessonID, err := strconv.ParseUint(lessonIDStr, 10, 32)
	if err != nil || lessonID == 0 {
		h.respondWithError(w, http.StatusBadRequest, "valid lesson_id is required")
		return
	}

	comments, err := h.services.CommentService.GetLessonComments(uint(lessonID))
	if err != nil {
		h.respondWithError(w, http.StatusInternalServerError, "Failed to fetch comments")
		return
	}

	h.respondWithJSON(w, http.StatusOK, schema.LessonCommentsResponse{
		Success:  true,
		Comments: comments,
	})
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
