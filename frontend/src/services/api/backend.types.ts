// Типы данных, соответствующие бэкенду на Go

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface BackendLoginRequest {
  email: string;
  password: string;
}

export interface BackendLoginResponse {
  email: string;
  token: string; // JWT Access Token
  // refresh_token приходит в HttpOnly cookie
}

export interface BackendRegisterRequest {
  email: string;
  password: string;
  username: string;
  name: string;
  student_card: string;
  date_of_birth: string;
  cource: number;
  gpa: number;
}

export interface BackendRegisterResponse {
  id: number;
}

export interface BackendRefreshResponse {
  token: string; // новый Access Token
}

export interface BackendLogoutResponse {
  message: string;
}

// ============================================
// USER PROFILE TYPES
// ============================================

export interface BackendStudentProfile {
  id: number;
  username: string;
  email: string;
}

export interface BackendStudentData {
  name: string;
  student_card: string;
  date_of_birth: string | null;
  cource: string;
  gpa: number | null;
}

export interface BackendUserProfileResponse {
  student: BackendStudentProfile;
  student_data: BackendStudentData;
}

export interface BackendUpdateProfileRequest {
  student: BackendStudentProfile;
  student_data: BackendStudentData;
}

export interface BackendUpdateProfileResponse {
  id: number;
}

export interface BackendChangePasswordRequest {
  email: string;
  old_password: string;
  new_password: string;
}

export interface BackendChangePasswordResponse {
  id: number;
}

// ============================================
// COURSE TYPES
// ============================================

export interface BackendCourse {
  name: string;
  professor: string;
  description: string;
  type: string;
}

export interface BackendCourseDashboardRequest {
  course_name: string;
}

export interface BackendCourseDashboardResponse {
  description: string;
  name: string;
  professor: string;
  type: string;
}

export interface BackendCourseLessonsRequest {
  course_name: string;
}

export interface BackendLesson {
  name: string;
  description: string;
}

export interface BackendCourseLessonsResponse {
  lessons: BackendLesson[];
}

export interface BackendCourseEnrollRequest {
  course_name: string;
  email: string;
}

export interface BackendCourseEnrollResponse {
  course_name: string;
}

export interface BackendUserCoursesResponse {
  name: string;
  professor: string;
  description: string;
  type: string;
}

// ============================================
// LESSON TYPES
// ============================================

export interface BackendLessonRequest {
  course_name: string;
  lesson_name: string;
}

export interface BackendLessonResponse {
  name: string;
  description: string;
}

// ============================================
// HOMEWORK TYPES
// ============================================

export interface BackendHomeworkGetRequest {
  course_name: string;
  lesson_name: string;
  email: string;
  homework_id?: string; // UUID для получения файлов
}

export interface BackendHomeworkFile {
  name: string;
  url: string; // presigned URL, действителен 15 минут
}

export interface BackendHomeworkResponse {
  course_name: string;
  lesson_name: string;
  professor: string;
  description: string;
  mark: number;
  homework_id?: string; // UUID
  files?: BackendHomeworkFile[];
}

export interface BackendHomeworkSubmitData {
  course_name: string;
  lesson_name: string;
  email: string;
  homework_id?: string; // опционально, для повторной отправки
}

// FormData для отправки:
// - file (multiple files)
// - HW_data (JSON string с BackendHomeworkSubmitData)

// ============================================
// COMMENT TYPES
// ============================================

export interface BackendComment {
  id: number;
  comment: string;
  username: string;
  user_id: number;
  created_at: string;
}

export interface BackendCommentsResponse {
  success: boolean;
  comments: BackendComment[];
}

export interface BackendCourseCommentRequest {
  course_id: number;
  comment: string;
}

export interface BackendLessonCommentRequest {
  lesson_id: number;
  comment: string;
}

// ============================================
// ERROR TYPES
// ============================================

export interface BackendErrorResponse {
  error?: string;
  message?: string;
  details?: unknown;
}

// ============================================
// UTILITY TYPES
// ============================================

export type BackendApiResponse<T> = T | BackendErrorResponse;

// ============================================
// HELPER FUNCTIONS FOR TYPE GUARDS
// ============================================

export function isBackendError(response: unknown): response is BackendErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    ('error' in response || 'message' in response)
  );
}

export function assertBackendSuccess<T>(
  response: BackendApiResponse<T>
): asserts response is T {
  if (isBackendError(response)) {
    throw new Error(response.error || response.message || 'Unknown backend error');
  }
}
