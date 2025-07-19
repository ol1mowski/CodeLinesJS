import { httpClient } from "../../../../../api/httpClient.api";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRegisterAction } from '../useRegisterAction.hook';

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('useRegisterAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
    setIsAuthenticated: vi.fn(),
    setUser: vi.fn(),
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  };

  const mockResponse = {
    data: {
      user: { id: '1', email: 'test@example.com', username: 'testuser' },
    },
    error: null,
    status: 200,
  };

  const mockErrorResponse = {
    data: null,
    error: 'Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje w systemie',
    status: 409,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should register user successfully', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const register = useRegisterAction(mockState);

    await register('test@example.com', 'password123', 'testuser');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith('auth/register', {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    });

    expect(mockState.setUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle registration error - user already exists', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const register = useRegisterAction(mockState);

    await register('existing@example.com', 'password123', 'existinguser');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle registration error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce(new Error('Network error'));

    const register = useRegisterAction(mockState);

    await register('test@example.com', 'password123', 'testuser');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith('Network error');
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle missing data in response', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({
      data: null,
      error: null,
      status: 200,
    });

    const register = useRegisterAction(mockState);

    await register('test@example.com', 'password123', 'testuser');

    expect(mockState.setError).toHaveBeenCalledWith(
      'Nieznany błąd rejestracji. Spróbuj ponownie później.'
    );
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
