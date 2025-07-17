import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useGoogleLoginAction } from '../useGoogleLoginAction.hook';
import { httpClient } from '../../../../../api/httpClient.api';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

describe('useGoogleLoginAction', () => {
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

  const userData = { id: '1', email: 'google-user@example.com', username: 'googleuser' };

  const mockResponse = {
    data: {
      user: userData,
    },
    error: null,
    status: 200,
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
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should login user successfully', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith('auth/google-login', {
      credential: mockCredentialResponse.credential,
      rememberMe: false,
    });
    expect(mockState.setUser).toHaveBeenCalledWith(userData);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle Google login error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const loginWithGoogle = useGoogleLoginAction(mockState);

    await loginWithGoogle(mockCredentialResponse, false);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
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
});
