import { apiClient } from './client';
import type { ApiResponse } from './client';
import type { LoginCredentials, RegisterData, User } from '../../types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );

    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );

    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Clear tokens even if request fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/refresh',
      { refreshToken }
    );

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password });
  },
};
