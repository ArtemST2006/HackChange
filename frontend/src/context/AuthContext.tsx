import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types';
import { mockUser } from '../utils/mockData';
import { authService } from '../services/api/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Check if we should use mock data based on environment variable
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (USE_MOCK_DATA) {
        // Mock mode: use stored user data
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        // Real API mode: verify token and get current user
        if (token) {
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
          } catch (error) {
            // Token is invalid, clear it
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        // Mock login - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const loggedInUser = mockUser;
        setUser(loggedInUser);

        if (credentials.rememberMe) {
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          localStorage.setItem('authToken', 'mock-token');
        }
      } else {
        // Real API login
        const response = await authService.login(credentials);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Неверный email или пароль';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        // Mock registration - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'student',
          registeredAt: new Date().toISOString(),
        };

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('authToken', 'mock-token');
      } else {
        // Real API registration
        const response = await authService.register(data);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Ошибка регистрации';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (!USE_MOCK_DATA) {
        // Real API logout
        await authService.logout();
      }
    } finally {
      // Clear user data in both modes
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
