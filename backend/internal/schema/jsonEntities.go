package schema

// хз че там с токенами

type ErrorResponse struct {
	Error struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

type DashboardResponse struct {
	Course Course `json:"course"`
}

type RegistrationReq struct {
	Email          string  `json:"email"`
	HashedPassword string  `json:"password"`
	Username       string  `json:"username"`
	Name           string  `json:"name"`
	StudentCard    string  `json:"student_card"`
	DateOfBirth    string  `json:"date_of_birth"`
	Cource         int     `json:"cource"`
	GPA            float64 `json:"gpa"`
}

type RegistrationResp struct {
	Email string `json:"email"`
}

type LoginReq struct {
	Email          string `json:"email"`
	HashedPassword string `json:"password"`
}

type LoginResp struct {
	Email string `json:"email"`
	Token string `json:"token"`
}

type RefreshReq struct {
	Email        string `json:"email"`
	RefreshToken string `json:"refresh_token"`
}

type RefreshResp struct {
	Email        string `json:"email"`
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
}

type UserProfile struct {
	User struct {
		Email       string  `json:"email"`
		Username    string  `json:"username"`
		Name        string  `json:"name"`
		StudentCard string  `json:"student_card"`
		DateOfBirth string  `json:"date_of_birth"`
		Cource      int     `json:"cource"`
		GPA         float64 `json:"gpa"`
	} `json:"user"`
}

type UserChangePassReq struct {
	Email             string `json:"email"`
	HashedOldPassword string `json:"old_password"`
	HashedNewPassword string `json:"new_password"`
}

type UserChangePassResp struct {
	Email string `json:"email"`
}

type CourseDB struct {
	Name        string `json:"name"`
	Professor   string `json:"professor"`
	Description string `json:"description"`
}

type CourseReq struct {
	CourseName string `json:"course_name"`
}

// ------------ КОММЕНТАРИИ ------------------

// Один комментарий
type CommentResp struct {
	ID        uint   `json:"id"`
	Comment   string `json:"comment"`
	Username  string `json:"username"`
	UserID    uint   `json:"user_id"`
	CreatedAt string `json:"created_at"`
}

// Добавить комментарий к курсу
type CourseCommentRequest struct {
	CourseID uint   `json:"course_id"`
	Comment  string `json:"comment"`
}

// Добавить коммент к уроку
type LessonCommentRequest struct {
	LessonID uint   `json:"lesson_id"`
	Comment  string `json:"comment"`
}

// Ответ со списком комментариев курса
type CourseCommentsResponse struct {
	Success  bool          `json:"success"`
	Comments []CommentResp `json:"comments"`
}

// Ответ со списком комментариев урока
type LessonCommentsResponse struct {
	Success  bool          `json:"success"`
	Comments []CommentResp `json:"comments"`
}

// ---------------------------------------------------

type LessonResp struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type LessonReq struct {
	CourseName string `json:"course_name"`
	LessonName string `json:"lesson_name"`
}

type SignupCourseReq struct {
	CourseName string `json:"course_name"`
	Email      string `json:"email"`
}

type SignupCourseResp struct {
	CourseName string `json:"course_name"`
}

type HomeworkReq struct {
	CourseName string `json:"course_name"`
	LessonName string `json:"lesson_name"`
	Email      string `json:"email"`
}

type HomeworkResp struct {
	CourseName  string     `json:"course_name"`
	LessonName  string     `json:"lesson_name"`
	Professor   string     `json:"professor"`
	Description string     `json:"description"`
	Mark        int        `json:"mark"`
	Files       []struct{} // тут надо будет сделать
}

type HomeworkPost struct {
	CourseName string     `json:"course_name"`
	LessonName string     `json:"lesson_name"`
	Email      string     `json:"email"`
	Files      []struct{} // тут надо будет сделать

}
