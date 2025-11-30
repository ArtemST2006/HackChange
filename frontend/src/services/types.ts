// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

// Course API types
export interface CourseResponse {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  category: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  studentsCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface EnrolledCourseResponse extends CourseResponse {
  progress: number;
  totalModules: number;
  completedModules: number;
  isActive: boolean;
  startDate: string;
  averageGrade?: number;
}

export interface ModuleResponse {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  totalLessons: number;
  completedLessons: number;
  isLocked: boolean;
  createdAt: string;
}

export interface LessonResponse {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'practice' | 'test' | 'homework';
  duration?: string;
  status: 'completed' | 'in-progress' | 'locked' | 'not-started';
  order: number;
  videoUrl?: string;
  content?: string;
  isLocked: boolean;
  createdAt: string;
}

export interface LessonProgressResponse {
  lessonId: string;
  userId: string;
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
  lastAccessedAt?: string;
  completedAt?: string;
}

export interface CourseProgressResponse {
  courseId: string;
  userId: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  startedAt: string;
}

// Homework API types
export interface HomeworkResponse {
  id: string;
  courseId: string;
  courseName: string;
  moduleId?: string;
  lessonId?: string;
  title: string;
  description: string;
  deadline: string;
  maxGrade: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt?: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
}

export interface HomeworkSubmissionRequest {
  homeworkId: string;
  content: string;
  files?: File[];
}

// User API types
export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  bio?: string;
  role: 'student' | 'teacher' | 'admin';
  registeredAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  phone?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  bio?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Statistics API types
export interface UserStatisticsResponse {
  activeCourses: number;
  completedCourses: number;
  totalHomeworks: number;
  completedHomeworks: number;
  totalTests: number;
  completedTests: number;
  averageGrade: number;
  streak: number;
  totalStudyTime: number;
  registeredAt: string;
}

// Auth API types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfileResponse;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
