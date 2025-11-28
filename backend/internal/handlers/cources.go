package handlers

import (
	"net/http"
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

}

// PostCourseComment godoc
// @Summary      Отправить комментарий к курсу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.CourceCommentReq		true	"Комментарий к курсу"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	entities.CommentResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/comment [post]
func (h *Handler) PostCourseComment(w http.ResponseWriter, r *http.Request) {

}

// GetCourseComment godoc
// @Summary      Получить комментарии к курсу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.CourceCommentGet		true	"Данные о курсе"
// @Success		 200 	{array}		entities.CommentResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/comment [get]
func (h *Handler) GetCourseComment(w http.ResponseWriter, r *http.Request) {

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

}

// PostLessonComment godoc
// @Summary      Отправить комментарий к уроку
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.LessonCommentReq	true	"Комментарий к уроку"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	entities.CommentResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson/comment [post]
func (h *Handler) PostLessonComment(w http.ResponseWriter, r *http.Request) {

}

// GetLessonComment godoc
// @Summary      Получить комментарии к уроку
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		entities.LessonCommentGet	true	"Данные о уроке"
// @Success		 200 	{array}		entities.CommentResp
// @Failure      400    {object}	entities.ErrorResponse
// @Failure      404    {object}	entities.ErrorResponse
// @Failure      500    {object}	entities.ErrorResponse
// @Router       /course/lesson/comment [get]
func (h *Handler) GetLessonComment(w http.ResponseWriter, r *http.Request) {

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

}