// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'Произошла ошибка',
          errors: data.errors,
          statusCode: response.status,
        };
        throw error;
      }

      return data;
    } catch (error) {
      // Re-throw ApiError as-is
      if ((error as ApiError).statusCode) {
        throw error;
      }

      // Handle network errors
      throw {
        message: 'Ошибка подключения к серверу',
        statusCode: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'Произошла ошибка',
          errors: data.errors,
          statusCode: response.status,
        };
        throw error;
      }

      return data;
    } catch (error) {
      if ((error as ApiError).statusCode) {
        throw error;
      }

      throw {
        message: 'Ошибка загрузки файла',
        statusCode: 0,
      } as ApiError;
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
