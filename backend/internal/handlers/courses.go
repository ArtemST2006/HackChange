package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/ArtemST2006/HackChange/internal/schema"
	"github.com/google/uuid"
)

func (h *Handler) decodeJSON(r *http.Request, v interface{}) error {
	decoder := json.NewDecoder(r.Body)
	return decoder.Decode(v)
}

func (h *Handler) errorResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(schema.ErrorResponse{
		Error: struct {
			Code    int    `json:"code"`
			Message string `json:"message"`
		}{
			Code:    statusCode,
			Message: message,
		},
	})
}

func (h *Handler) successResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

// GetAllCourses godoc
// @Summary      Получить все курсы
// @Tags         cources
// @Accept       json
// @Produce      json
// @Success		 200 	{array}		schema.Course
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /courses [get]
func (h *Handler) GetAllCourses(w http.ResponseWriter, r *http.Request) {
	panic("implement me")
}

// GetCourseDashboard godoc
// @Summary      Получить главную страницу курса
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		schema.DashboardRequest	true	"Информация о курсе"
// @Success		 200 	{object}	schema.DashboardResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/dashboard [get]
func (h *Handler) GetCourseDashboard(w http.ResponseWriter, r *http.Request) { // art
	request := schema.DashboardRequest{}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	response, err := h.services.Courses.GetCourseDashboard(request)

	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
	}
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
// @Param        body	body		schema.LessonsRequest	true	"Информация о курсе"
// @Success		 200 	{array}		schema.LessonsResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/lessons [get]
func (h *Handler) GetCourseLessons(w http.ResponseWriter, r *http.Request) { // art
	request := schema.LessonsRequest{}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	response, err := h.services.Courses.GetCourseLessons(request)

	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
	}
}

// GetCourseLesson godoc
// @Summary      Получить урок курса
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		schema.LessonReq	true	"Информация об уроке"
// @Success		 200 	{object}	schema.LessonResp
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/lesson [get]
func (h *Handler) GetCourseLesson(w http.ResponseWriter, r *http.Request) { // art
	request := schema.LessonReq{}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	response, err := h.services.Courses.GetCourseLesson(request)

	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
	}
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
// @Param        body	body		schema.SignupCourseReq	true	"Регистрация на курс"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	schema.SignupCourseResp
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/lesson/sign_up [post]
func (h *Handler) SignupCourse(w http.ResponseWriter, r *http.Request) { // art
	request := schema.SignupCourseReq{}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	response, err := h.services.Courses.SignupCourse(request)

	if err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, err.Error())
	}
}

// GetHomework godoc
// @Summary      Получить домашнюю работу
// @Tags         cources
// @Accept       json
// @Produce      json
// @Param        body	body		schema.HomeworkReq	true	"Данные о домашней работе"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 200 	{array}		schema.HomeworkResp
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/lesson/homework [get]
func (h *Handler) GetHomework(w http.ResponseWriter, r *http.Request) {
	var req schema.HomeworkReq
	if err := h.decodeJSON(r, &req); err != nil {
		h.errorResponse(w, http.StatusBadRequest, "Invalid request body")
		return
	}
	homeworkID := r.URL.Query().Get("homework_id")
	var files []schema.HomeworkFile
	if homeworkID != "" {
		urls, err := h.services.MinioService.GetHomeworkURL(r.Context(), req.LessonName, homeworkID, []string{"homework.zip"}, int64(15*60))
		if err == nil && urls != nil {

			for name, u := range urls {
				files = append(files, schema.HomeworkFile{Name: name, URL: u})
			}
		}
	}

	resp := []schema.HomeworkResp{
		{
			CourseName:  req.CourseName,
			LessonName:  req.LessonName,
			Professor:   "Professor Name",
			Description: "Homework description",
			Mark:        0,
			Files:       files,
		},
	}

	h.successResponse(w, http.StatusOK, resp)
}

// PostHomework godoc
// @Summary      Отправить домашнюю работу
// @Tags         cources
// @Accept       multipart/form-data
// @Produce      json
// @Param		 file    formData  	file      				true   "Файл для загрузки ??? хз как"
// @Param 		 HW_data formData 	schema.HomeworkPost	true   "Данные о домашней работе"
// @Param        Authorization	header	string	true	"Bearer"
// @Success		 201 	{object}	schema.HomeworkResp
// @Failure      400    {object}	schema.ErrorResponse
// @Failure      500    {object}	schema.ErrorResponse
// @Router       /course/lesson/homework [post]
func (h *Handler) PostHomework(w http.ResponseWriter, r *http.Request) {
	// Parse multipart form
	err := r.ParseMultipartForm(100 << 20) // 32MB max memory
	if err != nil {
		h.errorResponse(w, http.StatusBadRequest, "Failed to parse form")
		return
	}

	// Support multiple files with form key "file"
	if err := r.ParseMultipartForm(100 << 20); err != nil {
		h.errorResponse(w, http.StatusBadRequest, "Failed to parse multipart form")
		return
	}

	uploadedFiles := []schema.HomeworkUploadFile{}
	filesHeaders := r.MultipartForm.File["file"]
	if len(filesHeaders) == 0 {
		h.errorResponse(w, http.StatusBadRequest, "No files uploaded")
		return
	}

	for _, fh := range filesHeaders {
		f, err := fh.Open()
		if err != nil {
			h.errorResponse(w, http.StatusInternalServerError, "Failed to open uploaded file")
			return
		}
		data, err := io.ReadAll(f)
		f.Close()
		if err != nil {
			h.errorResponse(w, http.StatusInternalServerError, "Failed to read uploaded file")
			return
		}
		uploadedFiles = append(uploadedFiles, schema.HomeworkUploadFile{Name: fh.Filename, Data: data})
	}

	// Get homework data from form
	hwDataStr := r.FormValue("HW_data")
	if hwDataStr == "" {
		h.errorResponse(w, http.StatusBadRequest, "No homework data provided")
		return
	}

	var hwData schema.HomeworkPost
	if err := json.Unmarshal([]byte(hwDataStr), &hwData); err != nil {
		h.errorResponse(w, http.StatusBadRequest, "Invalid homework data")
		return
	}

	homeworkID := uuid.New().String()

	ctx := r.Context()
	err = h.services.MinioService.UploadHomework(ctx, hwData.LessonName, homeworkID, uploadedFiles)
	if err != nil {
		h.errorResponse(w, http.StatusInternalServerError, "Failed to upload file to storage")
		return
	}
	fileNames := make([]string, 0, len(uploadedFiles))
	for _, f := range uploadedFiles {
		fileNames = append(fileNames, f.Name)
	}
	urls, _ := h.services.MinioService.GetHomeworkURL(ctx, hwData.LessonName, homeworkID, fileNames, int64(15*60))

	filesResp := []schema.HomeworkFile{}
	for _, f := range uploadedFiles {
		filesResp = append(filesResp, schema.HomeworkFile{Name: f.Name, URL: urls[f.Name]})
	}

	resp := schema.HomeworkResp{
		CourseName:  hwData.CourseName,
		LessonName:  hwData.LessonName,
		Professor:   "Professor Name",
		Description: "Homework uploaded successfully",
		Mark:        0,
		HomeworkID:  homeworkID,
		Files:       filesResp,
	}

	h.successResponse(w, http.StatusCreated, resp)
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
