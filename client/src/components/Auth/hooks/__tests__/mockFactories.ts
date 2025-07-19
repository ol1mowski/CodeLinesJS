import { vi } from 'vitest';
import { User } from '../../types/auth.types';

export const createMockAuth = (overrides: Partial<any> = {}) => ({
  login: vi.fn(),
  register: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
  logout: vi.fn(),
  loginWithGoogle: vi.fn(),

  loading: false,
  error: null,
  isAuthenticated: false,
  isAuthChecking: false,
  user: null,
  token: null,
  
  ...overrides,
});

export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  _id: '1',
  email: 'test@example.com',
  username: 'testuser',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
});

export const createMockAuthState = (overrides: Partial<any> = {}) => ({
  setLoading: vi.fn(),
  setError: vi.fn(),
  setIsAuthenticated: vi.fn(),
  setUser: vi.fn(),
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  ...overrides,
});

export const createMockApiResponse = <T = any>(
  data: T | null = null,
  error: string | null = null,
  status: number = 200
) => ({
  data,
  error,
  status,
});

export const createMockFormState = (overrides: Partial<any> = {}) => ({
  register: vi.fn(),
  handleSubmit: vi.fn(),
  formState: {
    errors: {},
    isSubmitting: false,
    isDirty: false,
  },
  watch: vi.fn(),
  setValue: vi.fn(),
  reset: vi.fn(),
  ...overrides,
}); 