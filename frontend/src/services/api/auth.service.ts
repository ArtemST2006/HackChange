import { apiClient } from './client';
import type {
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
  RegistrationResponse,
  RefreshResponse,
  UserChangePasswordRequest,
  UserChangePasswordResponse,
  StudentProfile,
} from '../../types/backend.types';

/**
 * Authentication Service
 * Matches backend Go API exactly
 */
export const authService = {
  /**
   * Login user
   * POST /auth/login
   * Backend sets refresh_token as HttpOnly cookie
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    // Save JWT access token to localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', response.email);
    }

    // Note: refresh_token is automatically stored in HttpOnly cookie by backend
    return response;
  },

  /**
   * Register new user
   * POST /auth/register
   */
  async register(data: RegistrationRequest): Promise<RegistrationResponse> {
    const response = await apiClient.post<RegistrationResponse>(
      '/auth/register',
      data
    );

    return response;
  },

  /**
   * Logout user
   * POST /auth/logout
   * Clears refresh_token cookie on backend
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post<{ message: string }>('/auth/logout');
    } finally {
      // Clear tokens even if request fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh JWT access token
   * POST /auth/refresh
   * Uses refresh_token from HttpOnly cookie
   */
  async refreshToken(): Promise<RefreshResponse> {
    const response = await apiClient.post<RefreshResponse>('/auth/refresh');

    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', response.email);
    }

    return response;
  },

  /**
   * Get current user profile
   * GET /user/profile (Protected)
   */
  async getCurrentUser(): Promise<StudentProfile> {
    const response = await apiClient.get<StudentProfile>('/user/profile');

    // Cache user data
    localStorage.setItem('user', JSON.stringify(response));

    return response;
  },

  /**
   * Change user password
   * PUT /user/password (Protected)
   */
  async changePassword(data: UserChangePasswordRequest): Promise<UserChangePasswordResponse> {
    const response = await apiClient.put<UserChangePasswordResponse>(
      '/user/password',
      data
    );
    return response;
  },
};
