import { httpClient } from "../../../../../api/httpClient.api";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useResetPasswordAction } from '../useResetPasswordAction.hook';

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('useResetPasswordAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
  };

  const mockResponse = {
    data: {
      message: 'Hasło zostało pomyślnie zmienione.',
    },
    error: null,
    status: 200,
  };

  const mockErrorResponse = {
    data: null,
    error: 'Token resetowania hasła wygasł lub jest nieprawidłowy.',
    status: 401,
  };

  vi.useFakeTimers();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should reset password successfully', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const resetPassword = useResetPasswordAction(mockState);

    const result = await resetPassword('valid-token-123456', 'newPassword123', 'newPassword123');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith('auth/reset-password', {
      token: 'valid-token-123456',
      password: 'newPassword123',
      confirmPassword: 'newPassword123',
    });
    expect(result).toBe(mockResponse.data.message);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle invalid token error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const resetPassword = useResetPasswordAction(mockState);

    await expect(
      resetPassword('invalid-token', 'newPassword123', 'newPassword123')
    ).rejects.toThrow(mockErrorResponse.error);

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle password mismatch error', async () => {
    const resetPassword = useResetPasswordAction(mockState);

    await expect(resetPassword('valid-token-123456', 'password1', 'password2')).rejects.toThrow(
      'Hasła nie są identyczne'
    );

    expect(mockState.setError).toHaveBeenCalledWith(
      'Hasła nie są identyczne. Upewnij się, że oba pola zawierają to samo hasło.'
    );
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it('should handle invalid token error (too short)', async () => {
    const resetPassword = useResetPasswordAction(mockState);

    await expect(resetPassword('short', 'password123', 'password123')).rejects.toThrow(
      'Nieprawidłowy token'
    );

    expect(mockState.setError).toHaveBeenCalledWith(
      'Nieprawidłowy token resetowania hasła. Sprawdź, czy link jest poprawny.'
    );
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it('should handle password reset error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce(new Error('Network error'));

    const resetPassword = useResetPasswordAction(mockState);

    await expect(
      resetPassword('valid-token-123456', 'newPassword123', 'newPassword123')
    ).rejects.toThrow('Network error');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith('Network error');
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should return default message when there is no message in response', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({
      data: {},
      error: null,
      status: 200,
    });

    const resetPassword = useResetPasswordAction(mockState);

    const result = await resetPassword('valid-token-123456', 'newPassword123', 'newPassword123');

    expect(result).toBe(
      'Hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany do strony logowania.'
    );
  });
});
