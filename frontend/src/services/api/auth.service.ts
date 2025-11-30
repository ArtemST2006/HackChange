import { apiClient } from './client';
import type {
  LoginRequest,
  RegistrationRequest,
  RegistrationResponse,
  UserChangePasswordRequest,
  UserChangePasswordResponse,
  StudentProfile,
} from '../../types/backend.types';

// Response types
interface LoginResponse {
  email: string;
  token: string;
  refresh_token: string;
}

interface RefreshResponse {
  token: string;
  refresh_token: string;
}

/**
 * Authentication Service
 * Matches backend Go API exactly
 */
export const authService = {
  /**
   * Login user
   * POST /auth/login
   * Returns access token and refresh token in JSON
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    // Save tokens to localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refreshToken', response.refresh_token);
    }
    if (response.email) {
      localStorage.setItem('userEmail', response.email);
    }

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
   * Sends refresh_token in request body
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post<{ message: string }>('/auth/logout', {
          refresh_token: refreshToken,
        });
      }
    } finally {
      // Clear all tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh JWT access token
   * POST /auth/refresh
   * Sends refresh_token in request body
   */
  async refreshToken(): Promise<RefreshResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });

    // Save new tokens
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refreshToken', response.refresh_token);
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
