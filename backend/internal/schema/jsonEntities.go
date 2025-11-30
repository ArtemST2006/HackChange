package schema

// хз че там с токенами

type ErrorResponse struct {
	Error struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

// Dachboard
type DashboardRequest struct {
	CourseName string `json:"course_name"` // добавь в свагер
}

type DashboardResponse struct { // поменял поля
	Description string `json:"description"`
	Name        string `json:"name"`
	Professor   string `json:"professor"`
	Type        string `json:"type"`
}

// Lessons arrey
type LessonsRequest struct {
	CourseName string `json:"course_name"` // добавь в свагер
}

type LessonsResponse struct { // добавь в свагер
	Lessons []LessonResp `json:"lessons"`
}

type RegistrationReq struct {
	Email          string  `json:"email"`
	HashedPassword string  `json:"password"`
	Username       string  `json:"username"`
	Name           string  `json:"name"`
	StudentCard    string  `json:"student_card"`
	DateOfBirth    string  `json:"date_of_birth"`
	Cource         string  `json:"cource"`
	GPA            float32 `json:"gpa"`
}

type RegistrationResp struct {
	Email string `json:"email"`
}

type LoginReq struct {
	Email          string `json:"email"`
	HashedPassword string `json:"password"`
}

type LoginResp struct {
	Token string `json:"token"`
}

type RefreshResp struct {
	Email        string `json:"email"`
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
}

type StudentProfile struct {
	Student struct {
		Id       uint   `json:"id"`
		Username string `json:"username"`
		Email    string `json:"email"`
	} `json:"student"`
	StudentData struct {
		Name        string   `json:"name"`
		StudentCard string   `json:"student_card"`
		DateOfBirth *string  `json:"date_of_birth"`
		Course      string   `json:"cource"`
		GPA         *float32 `json:"gpa"`
	} `json:"student_data"`
}

type UserChangePassReq struct {
	Email       string `json:"email"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type CourseDB struct {
	Name        string `json:"name"`
	Professor   string `json:"professor"`
	Description string `json:"description"`
	Type        string `json:"type"`
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
	CourseName  string         `json:"course_name"`
	LessonName  string         `json:"lesson_name"`
	Professor   string         `json:"professor"`
	Description string         `json:"description"`
	Mark        int            `json:"mark"`
	HomeworkID  string         `json:"homework_id,omitempty"`
	Files       []HomeworkFile `json:"files"`
}

type HomeworkPost struct {
	CourseName string         `json:"course_name"`
	LessonName string         `json:"lesson_name"`
	Email      string         `json:"email"`
	Files      []HomeworkFile `json:"files"`
	HomeworkID string         `json:"homework_id,omitempty"`
}

type HomeworkFile struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

type HomeworkUploadFile struct {
	Name string
	Data []byte
}
