import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - добавляем токен авторизации
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config && typeof config === 'object') {
          // ensure headers object exists — merge to avoid constructing an incompatible AxiosHeaders instance
          config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` } as typeof config.headers;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - обработка ошибок
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config as any;

        // Если 401 и это не повторный запрос
        if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Пытаемся обновить токен
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await this.post<{ accessToken?: string }>('/auth/refresh', { refreshToken });
              const accessToken = response?.data?.accessToken;

              if (accessToken) {
                localStorage.setItem('accessToken', accessToken);

                // Повторяем оригинальный запрос с новым токеном
                if (!originalRequest.headers) originalRequest.headers = {};
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return this.axiosInstance(originalRequest);
              }
            }
          } catch (refreshError) {
            // Если обновление токена не удалось, очищаем данные и редиректим на логин
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
