package impl

import (
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/schema"
)

type UserService struct {
	repo repository.User
}

func NewUserService(repo repository.User) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) GetUser(studentID uint) (*schema.StudentProfile, error) {
	student, studentData, err := s.repo.GetUser(studentID)
	if err != nil {
		return nil, err
	}

	resp := &schema.StudentProfile{}
	resp.Student.Id = student.ID
	resp.Student.Email = student.Email
	resp.Student.Username = student.UserName
	resp.StudentData.Name = studentData.Name
	resp.StudentData.Course = studentData.Course
	resp.StudentData.DateOfBirth = studentData.DateOfBirth
	resp.StudentData.GPA = studentData.GPA
	resp.StudentData.StudentCard = studentData.StudentCards

	return resp, nil
}

func (s *UserService) UpdateUser(UserID uint, req *schema.StudentProfile) (*uint, error) {
	if err := s.repo.UpdateUser(UserID, req); err != nil {
		return nil, err
	}

	return &UserID, nil
}

func (s *UserService) GetUserCourses(UserID uint) (*[]schema.CourseDB, error) {
	courses, err := s.repo.GetUserCourses(UserID)
	if err != nil {
		return nil, err
	}

	return courses, nil
}

func (s *UserService) UserChangePass(UserID uint, req *schema.UserChangePassReq) (*uint, error) {
	if err := s.repo.UserChangePass(UserID, req); err != nil {
		return nil, err
	}

	return &UserID, nil
}