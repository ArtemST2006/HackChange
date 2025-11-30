import { apiClient } from './client';
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
  },
};
