import { apiClient } from './client';
import type {
  CourseCommentRequest,
  LessonCommentRequest,
  CourseCommentsResponse,
  LessonCommentsResponse,
} from '../../types/backend.types';

/**
 * Comments Service
 * Handles course and lesson comments
 */
export const commentsService = {
  /**
   * Get course comments
   * GET /course/comment?course_id=X (Protected)
   */
  async getCourseComments(courseId: number): Promise<CourseCommentsResponse> {
    const response = await apiClient.get<CourseCommentsResponse>(
      `/course/comment?course_id=${courseId}`
    );
    return response;
  },

  /**
   * Add comment to course
   * POST /course/comment (Protected)
   */
  async addCourseComment(courseId: number, comment: string): Promise<CourseCommentsResponse> {
    const requestBody: CourseCommentRequest = {
      course_id: courseId,
      comment: comment,
    };

    const response = await apiClient.post<CourseCommentsResponse>(
      '/course/comment',
      requestBody
    );

    return response;
  },

  /**
   * Get lesson comments
   * GET /lesson/comment?lesson_id=X (Protected)
   */
  async getLessonComments(lessonId: number): Promise<LessonCommentsResponse> {
    const response = await apiClient.get<LessonCommentsResponse>(
      `/lesson/comment?lesson_id=${lessonId}`
    );
    return response;
  },

  /**
   * Add comment to lesson
   * POST /lesson/comment (Protected)
   */
  async addLessonComment(lessonId: number, comment: string): Promise<LessonCommentsResponse> {
    const requestBody: LessonCommentRequest = {
      lesson_id: lessonId,
      comment: comment,
    };

    const response = await apiClient.post<LessonCommentsResponse>(
      '/lesson/comment',
      requestBody
    );

    return response;
  },
};
