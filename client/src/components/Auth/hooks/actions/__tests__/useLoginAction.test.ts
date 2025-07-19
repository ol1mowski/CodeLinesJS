import { httpClient } from "../../../../../api/httpClient.api";
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useLoginAction } from '../useLoginAction.hook';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

describe('useLoginAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
    setIsAuthenticated: vi.fn(),
    setUser: vi.fn(),
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
    error: 'Nieprawidłowe dane logowania',
    status: 401,
  };

  beforeEach(() => {
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
    expect(httpClient.post).toHaveBeenCalledWith('auth/login', {
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false,
    });
    expect(mockState.setUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle login error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const login = useLoginAction(mockState as any);

    await login('test@example.com', 'password123', false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });
});
