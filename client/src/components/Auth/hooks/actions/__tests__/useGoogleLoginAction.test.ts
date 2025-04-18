import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGoogleLoginAction } from '../useGoogleLoginAction.hook';
import { ApiResponse, httpClient } from '../../../../../api/httpClient.api';

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('useGoogleLoginAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
    setIsAuthenticated: vi.fn(),
    setUser: vi.fn(),
  };

  const userData = { id: '1', email: 'google-user@example.com', username: 'googleuser' };

  const mockResponse = {
    data: {
      data: {
        token: 'google-test-token',
        user: userData,
      },
      error: null,
      status: 200,
    }
  };

  const mockErrorResponse = {
    data: null,
    error: 'Nieprawidłowy token Google',
    status: 401,
  };

  const mockCredentialResponse = {
    credential: 'google-credential-token-123',
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
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse as ApiResponse<unknown>);

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith('auth/google-login', {
      credential: mockCredentialResponse.credential,
      rememberMe: false,
    });
    expect(sessionStorage.getItem('token')).toBe('google-test-token');
    expect(mockState.setUser).toHaveBeenCalledWith(userData);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should save token to localStorage when rememberMe=true', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse as ApiResponse<unknown>);

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, true);

    expect(localStorage.getItem('token')).toBe('google-test-token');
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('should handle Google login error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse as ApiResponse<unknown>);

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should handle missing Google token', async () => {
    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle({}, false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(
      'Nie udało się uzyskać tokenu uwierzytelniającego z Google. Spróbuj ponownie.'
    );
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it('should handle Google login error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce(new Error('Network error'));

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

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

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

    expect(mockState.setError).toHaveBeenCalledWith(
      'Nieznany błąd logowania przez Google. Spróbuj ponownie później.'
    );
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
