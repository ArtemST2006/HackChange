import { apiClient } from './client';
import type { ApiResponse } from './client';
import type { Homework, HomeworkSubmission } from '../../types';

export const homeworkService = {
  async getMyHomeworks(): Promise<Homework[]> {
    const response = await apiClient.get<ApiResponse<Homework[]>>('/homeworks/my');
    return response.data;
  },

  async getHomeworkById(id: string): Promise<Homework> {
    const response = await apiClient.get<ApiResponse<Homework>>(`/homeworks/${id}`);
    return response.data;
  },

  async submitHomework(
    homeworkId: string,
    hwMeta?: { courseName?: string; lessonName?: string; email?: string },
    textAnswer?: string,
    files?: File[]
  ): Promise<HomeworkSubmission> {
    const formData = new FormData();

    const hwData = {
      homework_id: homeworkId,
      course_name: hwMeta?.courseName ?? '',
      lesson_name: hwMeta?.lessonName ?? '',
      email: hwMeta?.email ?? localStorage.getItem('email') ?? '',
      files: [],
    } as any;

    if (textAnswer) {
      // include textual answer inside HW_data if provided
      hwData.text_answer = textAnswer;
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('file', file);
        hwData.files.push({ name: file.name, url: '' });
      });
    }

    formData.append('HW_data', JSON.stringify(hwData));

    const response = await apiClient.upload<ApiResponse<HomeworkSubmission>>(
      `/course/lesson/homework`,
      formData
    );

    return response.data;
  },

  async getSubmission(homeworkId: string): Promise<HomeworkSubmission | null> {
    try {
      const response = await apiClient.get<ApiResponse<HomeworkSubmission>>(
        `/homeworks/${homeworkId}/submission`
      );
      return response.data;
    } catch (error) {
      // Return null if no submission found (404)
      if ((error as any).statusCode === 404) {
        return null;
      }
      throw error;
    }
  },
};
