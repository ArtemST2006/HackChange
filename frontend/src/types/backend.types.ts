/**
 * Backend API Type Definitions
 * These types match the Go backend structs exactly
 */

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface RegistrationRequest {
  email: string;
  password: string; // Will be hashed on backend
  username: string;
  name: string;
  student_card: string;
  date_of_birth: string; // Format: YYYY-MM-DD
  cource: string; // Note: typo from backend
  gpa: number;
}

export interface RegistrationResponse {
  id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string; // JWT access token
  // refresh_token is set as HttpOnly cookie, not in response
}

export interface RefreshResponse {
  email: string;
  token: string; // New JWT access token
  refresh_token: string;
  expires_in: number;
}

export interface UserChangePasswordRequest {
  email: string;
  old_password: string;
  new_password: string;
}

export interface UserChangePasswordResponse {
  id: number;
}

// ============================================
// USER/PROFILE TYPES
// ============================================

export interface StudentProfile {
  student: {
    id: number;
    username: string;
    email: string;
  };
  student_data: {
    name: string;
    student_card: string;
    date_of_birth: string | null;
    cource: string; // Note: typo from backend
    gpa: number | null;
  };
}

export interface CourseDB {
  name: string;
  professor: string;
  description: string;
  type: string;
}

// ============================================
// COURSE TYPES
// ============================================

export interface DashboardRequest {
  course_name: string;
}

export interface DashboardResponse {
  description: string;
  name: string;
  professor: string;
  type: string;
}

export interface LessonsRequest {
  course_name: string;
}

export interface LessonInfo {
  name: string;
  description: string;
}

export interface LessonsResponse {
  lessons: LessonInfo[];
}

export interface LessonRequest {
  course_name: string;
  lesson_name: string;
}

export interface LessonResponse {
  name: string;
  description: string;
}

export interface SignupCourseRequest {
  course_name: string;
  email: string;
}

export interface SignupCourseResponse {
  course_name: string;
}

// ============================================
// COMMENT TYPES
// ============================================

export interface CourseCommentRequest {
  course_id: number;
  comment: string;
}

export interface LessonCommentRequest {
  lesson_id: number;
  comment: string;
}

export interface CommentResponse {
  id: number;
  comment: string;
  username: string;
  user_id: number;
  created_at: string; // RFC3339 format
}

export interface CourseCommentsResponse {
  success: boolean;
  comments: CommentResponse[];
}

export interface LessonCommentsResponse {
  success: boolean;
  comments: CommentResponse[];
}

// ============================================
// HOMEWORK TYPES
// ============================================

export interface HomeworkRequest {
  course_name: string;
  lesson_name: string;
  email: string;
}

export interface HomeworkFile {
  name: string;
  url: string; // Presigned URL (15 min expiry)
}

export interface HomeworkResponse {
  course_name: string;
  lesson_name: string;
  professor: string;
  description: string;
  mark: number;
  homework_id?: string;
  files: HomeworkFile[];
}

export interface HomeworkPost {
  course_name: string;
  lesson_name: string;
  email: string;
  files: HomeworkFile[];
  homework_id?: string;
}

// ============================================
// ERROR TYPES
// ============================================

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

export type ApiResponse<T> = T | ErrorResponse;

export function isErrorResponse(response: any): response is ErrorResponse {
  return response && typeof response === 'object' && 'error' in response;
}
