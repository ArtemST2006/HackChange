import { apiClient } from './client';
import type {
  StudentProfile,
  CourseDB,
} from '../../types/backend.types';

/**
 * User Service
 * Handles user profile and related operations
 */
export const userService = {
  /**
   * Get user profile
   * GET /user/profile (Protected)
   */
  async getProfile(): Promise<StudentProfile> {
    const response = await apiClient.get<StudentProfile>('/user/profile');
    return response;
  },

  /**
   * Update user profile
   * PUT /user/profile (Protected)
   */
  async updateProfile(profile: StudentProfile): Promise<{ id: number }> {
    const response = await apiClient.put<{ id: number }>(
      '/user/profile',
      profile
    );
    return response;
  },

  /**
   * Get courses user is enrolled in
   * GET /user/courses (Protected)
   */
  async getEnrolledCourses(): Promise<CourseDB[]> {
    const response = await apiClient.get<CourseDB[]>('/user/courses');
    return response;
  },
};
