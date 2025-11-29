import { apiClient, ApiResponse } from './client';
import { DashboardData, UserStatistics } from '../../types';

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data;
  },

  async getStatistics(): Promise<UserStatistics> {
    const response = await apiClient.get<ApiResponse<UserStatistics>>('/dashboard/statistics');
    return response.data;
  },
};
