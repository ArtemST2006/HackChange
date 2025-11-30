import { apiClient } from './client';
import type {
  HomeworkRequest,
  HomeworkResponse,
  HomeworkPost,
  HomeworkFile,
} from '../../types/backend.types';

/**
 * Homework Service
 * Matches backend Go API exactly
 */
export const homeworkService = {
  /**
   * Get homework for a lesson
   * GET /lesson/homework (Protected)
   * Can optionally filter by homework_id query param
   */
  async getHomework(
    courseName: string,
    lessonName: string,
    email: string,
    homeworkId?: string
  ): Promise<HomeworkResponse[]> {
    const requestBody: HomeworkRequest = {
      course_name: courseName,
      lesson_name: lessonName,
      email: email,
    };

    const queryParam = homeworkId ? `?homework_id=${homeworkId}` : '';
    const endpoint = `/lesson/homework${queryParam}`;

    const response = await apiClient.request<HomeworkResponse[]>(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  },

  /**
   * Submit homework
   * POST /lesson/homework (Protected)
   * Content-Type: multipart/form-data
   */
  async submitHomework(
    courseName: string,
    lessonName: string,
    email: string,
    files: File[],
    homeworkId?: string
  ): Promise<HomeworkResponse> {
    const formData = new FormData();

    // Add files
    files.forEach((file) => {
      formData.append('file', file);
    });

    // Create homework data object
    const homeworkData: HomeworkPost = {
      course_name: courseName,
      lesson_name: lessonName,
      email: email,
      files: [], // Will be populated by backend with MinIO URLs
      homework_id: homeworkId,
    };

    // Add homework data as JSON string
    formData.append('HW_data', JSON.stringify(homeworkData));

    const response = await apiClient.upload<HomeworkResponse>(
      '/lesson/homework',
      formData
    );

    return response;
  },
};
