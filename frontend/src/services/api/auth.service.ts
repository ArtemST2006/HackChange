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
    // Backend expects { email, password }
    const payload = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await apiClient.post<any>('/auth/login', payload);

    // Backend returns { email: ..., token: <access> } and sets refresh_token cookie
    const token = response.token ?? response.data?.token ?? response.data?.token;
    if (token) {
      localStorage.setItem('authToken', token);
    }

    // try to read refreshToken field if provided in body
    const refreshToken = response.refresh_token ?? response.refreshToken ?? response.data?.refreshToken;
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

    return {
      user: { id: '', email: credentials.email, firstName: '', lastName: '', role: 'student', registeredAt: '' },
      token,
      refreshToken,
    } as AuthResponse;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    // Map frontend RegisterData to backend RegistrationReq
    const payload = {
      email: data.email,
      password: data.password,
      username: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.email,
      name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.email,
      student_card: '',
  date_of_birth: '',
      cource: '',
      gpa: 0,
    };

    const response = await apiClient.post<any>('/auth/register', payload);

    // backend returns { id: <user id> }
    const created = response && (response.id || response.data?.id);

    return {
      user: { id: String(created ?? ''), email: data.email, firstName: data.firstName, lastName: data.lastName, role: 'student', registeredAt: '' },
      token: '',
    } as AuthResponse;
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
