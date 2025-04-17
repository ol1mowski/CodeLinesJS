import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useForgotPasswordAction } from '../useForgotPasswordAction.hook';
import { httpClient } from '../../../../../api/httpClient.api';

vi.mock('../../../../../api/httpClient.api', () => ({
  httpClient: {
    post: vi.fn(),
  },
}));

describe('useForgotPasswordAction', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
  };

  const mockResponse = {
    data: {
      message: 'Link do resetowania hasła został wysłany na podany adres email.',
    },
    error: null,
    status: 200,
  };

  const mockErrorResponse = {
    data: null,
    error: 'Nie znaleziono użytkownika o podanym adresie email.',
    status: 404,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should send reset password link successfully', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

    const forgotPassword = useForgotPasswordAction(mockState);

    const result = await forgotPassword('test@example.com');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(httpClient.post).toHaveBeenCalledWith('auth/forgot-password', {
      email: 'test@example.com',
    });
    expect(result).toBe(mockResponse.data.message);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle user not found error', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce(mockErrorResponse);

    const forgotPassword = useForgotPasswordAction(mockState);

    await expect(forgotPassword('nonexistent@example.com')).rejects.toThrow(
      mockErrorResponse.error
    );

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(null);
    expect(mockState.setError).toHaveBeenCalledWith(mockErrorResponse.error);
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle network error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce(new Error('Network error'));

    const forgotPassword = useForgotPasswordAction(mockState);

    await expect(forgotPassword('test@example.com')).rejects.toThrow('Network error');

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith('Network error');
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle unknown error', async () => {
    vi.mocked(httpClient.post).mockRejectedValueOnce('Unknown error');

    const forgotPassword = useForgotPasswordAction(mockState);

    await expect(forgotPassword('test@example.com')).rejects.toThrow(
      'Wystąpił błąd podczas wysyłania linku resetującego hasło'
    );

    expect(mockState.setLoading).toHaveBeenCalledWith(true);
    expect(mockState.setError).toHaveBeenCalledWith(
      'Wystąpił błąd podczas wysyłania linku resetującego hasło'
    );
    expect(mockState.setLoading).toHaveBeenCalledWith(false);
  });

  it('should return default message when there is no message in response', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({
      data: {},
      error: null,
      status: 200,
    });

    const forgotPassword = useForgotPasswordAction(mockState);

    const result = await forgotPassword('test@example.com');

    expect(result).toBe('Link do resetowania hasła został wysłany na Twój adres email.');
  });
});
