import { apiClient, ApiResponse } from './client';
import { Homework, HomeworkSubmission } from '../../types';

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
    textAnswer?: string,
    files?: File[]
  ): Promise<HomeworkSubmission> {
    const formData = new FormData();

    if (textAnswer) {
      formData.append('textAnswer', textAnswer);
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await apiClient.upload<ApiResponse<HomeworkSubmission>>(
      `/homeworks/${homeworkId}/submit`,
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
