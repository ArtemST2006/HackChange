import { apiClient } from './client';
<<<<<<< HEAD
import type { ApiResponse } from './client';
import type { Course, Module, Lesson } from '../../types';

export interface CoursesFilters {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  minDuration?: number;
  maxDuration?: number;
  search?: string;
}

export const coursesService = {
  async getAllCourses(filters?: CoursesFilters): Promise<Course[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<ApiResponse<Course[]>>(endpoint);
    return response.data;
  },

  async getMyCourses(): Promise<Course[]> {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses/my');
    return response.data;
  },

  async getCourseById(id: string): Promise<Course> {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data;
  },

  async getCourseModules(courseId: string): Promise<Module[]> {
    const response = await apiClient.get<ApiResponse<Module[]>>(`/courses/${courseId}/modules`);
    return response.data;
  },

  async getLesson(lessonId: string): Promise<Lesson> {
    const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${lessonId}`);
    return response.data;
  },

  async enrollCourse(courseId: string): Promise<void> {
    await apiClient.post(`/courses/${courseId}/enroll`);
  },

  async markLessonComplete(lessonId: string): Promise<void> {
    await apiClient.post(`/lessons/${lessonId}/complete`);
  },

  async getFeaturedCourses(): Promise<Course[]> {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses/featured');
    return response.data;
=======
import type {
  DashboardRequest,
  DashboardResponse,
  LessonsRequest,
  LessonsResponse,
  LessonRequest,
  LessonResponse,
  SignupCourseRequest,
  SignupCourseResponse,
  CourseDB,
} from '../../types/backend.types';

/**
 * Courses Service
 * Matches backend Go API exactly
 */
export const coursesService = {
  /**
   * Get course dashboard/homepage
   * GET /course/dashboard (Protected)
   * Note: Backend expects body in GET request
   */
  async getCourseDashboard(courseName: string): Promise<DashboardResponse> {
    const requestBody: DashboardRequest = { course_name: courseName };

    const response = await apiClient.request<DashboardResponse>('/course/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  },

  /**
   * Get all lessons in a course
   * GET /course/lessons (Protected)
   * Note: Backend expects body in GET request
   */
  async getCourseLessons(courseName: string): Promise<LessonsResponse> {
    const requestBody: LessonsRequest = { course_name: courseName };

    const response = await apiClient.request<LessonsResponse>('/course/lessons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  },

  /**
   * Get specific lesson details
   * GET /course/lesson (Protected)
   * Note: Backend expects body in GET request
   */
  async getLesson(courseName: string, lessonName: string): Promise<LessonResponse> {
    const requestBody: LessonRequest = {
      course_name: courseName,
      lesson_name: lessonName,
    };

    const response = await apiClient.request<LessonResponse>('/course/lesson', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  },

  /**
   * Enroll in a course
   * POST /course/lesson/signup (Protected)
   */
  async enrollInCourse(courseName: string, email: string): Promise<SignupCourseResponse> {
    const requestBody: SignupCourseRequest = {
      course_name: courseName,
      email: email,
    };

    const response = await apiClient.post<SignupCourseResponse>(
      '/course/lesson/signup',
      requestBody
    );

    return response;
  },

  /**
   * Get user's enrolled courses
   * GET /user/courses (Protected)
   */
  async getMyCourses(): Promise<CourseDB[]> {
    const response = await apiClient.get<CourseDB[]>('/user/courses');
    return response;
>>>>>>> origin/Front_bombas
  },
};
