import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLoginAction } from '../useLoginAction.hook';
import { httpClient } from '../../../../../api/httpClient.api';

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn()
  }
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

describe('useLoginAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
    setIsAuthenticated: vi.fn(),
    setUser: vi.fn()
  };

  const mockResponse = {
    data: {
      token: 'test-token',
      user: { id: '1', email: 'test@example.com', username: 'testuser' }
    },
    error: null,
    status: 200
  };

  const mockErrorResponse = {
    data: null,
    error: 'Nieprawidłowe dane logowania',
    status: 401
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should login user successfully', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const login = useLoginAction(mockState as any);
    
    await login('test@example.com', 'password123', false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith(
      'auth/login',
      { email: 'test@example.com', password: 'password123', rememberMe: false }
    );
    expect(sessionStorage.getItem('token')).toBe('test-token');
    expect(mockState.setUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should save token to localStorage when rememberMe=true', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const login = useLoginAction(mockState as any);
    
    await login('test@example.com', 'password123', true);

    expect(localStorage.getItem('token')).toBe('test-token');
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('should handle login error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const login = useLoginAction(mockState as any);
    
    await login('test@example.com', 'wrong-password', false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should handle network error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce(new Error('Network error'));

    const login = useLoginAction(mockState as any);
    
    await login('test@example.com', 'password123', false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith('Network error');
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle missing data in response', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({
      data: null,
      error: null,
      status: 200
    });

    const login = useLoginAction(mockState as any);
    
    await login('test@example.com', 'password123', false);

    expect(mockState.setError).toHaveBeenCalledWith('Nieznany błąd logowania. Spróbuj ponownie później.');
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
  });
}); 