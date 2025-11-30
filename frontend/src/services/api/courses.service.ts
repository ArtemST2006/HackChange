import { apiClient } from './client';
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
  },
};
