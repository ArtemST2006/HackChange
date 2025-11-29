package schema

import "time"

type Student struct {
	ID           uint   `gorm:"column:id;primaryKey;autoIncrement"`
	UserName     string `gorm:"column:user_name;type:varchar(255);not null"`
	Email        string `gorm:"column:email;type:varchar(255);not null;uniqueIndex"`
	HashPassword string `gorm:"column:hash_password;type:text;not null"`
}

func (Student) TableName() string { return "student" }

type Professor struct {
	ID       uint   `gorm:"column:id;primaryKey;autoIncrement"`
	Email    string `gorm:"column:email;type:varchar(255);not null;uniqueIndex"`
	Username string `gorm:"column:username;type:varchar(255);not null"`
}

func (Professor) TableName() string { return "professor" }

type Course struct {
	ID          uint   `gorm:"column:id;primaryKey;autoIncrement"`
	CourseName  string `gorm:"column:course_name;type:varchar(255);not null;uniqueIndex"`
	ProfessorID uint   `gorm:"column:professor_id;not null"`
	Type        string `gorm:"column:type;not null"`
	Description string `gorm:"column:description;type:text"`
}

func (Course) TableName() string { return "courses" }

type Lesson struct {
	ID          uint   `gorm:"column:id;primaryKey;autoIncrement"`
	CourseID    uint   `gorm:"column:course_id;not null"`
	LessonName  string `gorm:"column:lesson_name;not null"`
	Description string `gorm:"column:description;type:text"`
	VideoURL    string `gorm:"column:video_url;type:text"`
	Text        string `gorm:"column:text;type:text"`
	Homework    bool   `gorm:"column:homework;type:boolean;default:false"`
}

func (Lesson) TableName() string { return "lessons" }

type UserCourse struct {
	UserID   uint `gorm:"column:user_id;primaryKey"`
	CourseID uint `gorm:"column:course_id;primaryKey"`
}

func (UserCourse) TableName() string { return "user_course" }

type CommentCourse struct {
	ID        uint      `gorm:"column:id;primaryKey;autoIncrement"`
	UserID    uint      `gorm:"column:user_id;not null"`
	CourseID  uint      `gorm:"column:course_id;not null"`
	Comment   string    `gorm:"column:comment;type:text;not null"`
	CreatedAt time.Time `gorm:"column:created_at;default:now()"`
}

func (CommentCourse) TableName() string { return "comments_courses" }

type CommentLesson struct {
	ID        uint      `gorm:"column:id;primaryKey;autoIncrement"`
	UserID    uint      `gorm:"column:user_id;not null"`
	LessonID  uint      `gorm:"column:lesson_id;not null"`
	Comment   string    `gorm:"column:comment;type:text;not null"`
	CreatedAt time.Time `gorm:"column:created_at;default:now()"`
}

func (CommentLesson) TableName() string { return "comments_lessons" }

type Homework struct {
	ID        uint   `gorm:"column:id;primaryKey;autoIncrement"`
	StudentID uint   `gorm:"column:student_id;not null"`
	LessonID  uint   `gorm:"column:lesson_id;not null"`
	FilePath  string `gorm:"column:file_path;type:text"`
	MarkID    *uint  `gorm:"column:mark_id"`
}

func (Homework) TableName() string { return "homework" }

type Mark struct {
	ID          uint   `gorm:"column:id;primaryKey;autoIncrement"`
	HomeworkID  uint   `gorm:"column:homework_id;not null;uniqueIndex"`
	ProfessorID uint   `gorm:"column:professor_id;not null"`
	Mark        int    `gorm:"column:mark;type:integer"`
	Description string `gorm:"column:description;type:text"`
}

func (Mark) TableName() string { return "marks" }

type StudentData struct {
	UserID       uint     `gorm:"column:user_id;primaryKey"`
	StudentCards string   `gorm:"column:student_cards;type:text"`
	Name         string   `gorm:"column:name;type:varchar(255)"`
	DateOfBirth  *string  `gorm:"column:date_of_birth;type:date"`
	Course       string   `gorm:"column:course;type:varchar(255)"`
	GPA          *float32 `gorm:"column:gpa;type:numeric(3,2)"`
}

func (StudentData) TableName() string { return "student_data" }

type ProfessorData struct {
	ProfessorID uint    `gorm:"column:professor_id;primaryKey"`
	Name        string  `gorm:"column:name;type:varchar(255)"`
	DateOfBirth *string `gorm:"column:date_of_birth;type:date"`
}

func (ProfessorData) TableName() string { return "professor_data" }

// результат JOIN для комментариев курсов
type CommentCourseWithUser struct {
	ID        uint      `gorm:"column:id"`
	UserID    uint      `gorm:"column:user_id"`
	CourseID  uint      `gorm:"column:course_id"`
	Comment   string    `gorm:"column:comment"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UserName  string    `gorm:"column:user_name"`
}

func (CommentCourseWithUser) TableName() string {
	return "comments_courses"
}

// результат JOIN для комментариев уроков
type CommentLessonWithUser struct {
	ID        uint      `gorm:"column:id"`
	UserID    uint      `gorm:"column:user_id"`
	LessonID  uint      `gorm:"column:lesson_id"`
	Comment   string    `gorm:"column:comment"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UserName  string    `gorm:"column:user_name"`
}

func (CommentLessonWithUser) TableName() string {
	return "comments_lessons"
}
