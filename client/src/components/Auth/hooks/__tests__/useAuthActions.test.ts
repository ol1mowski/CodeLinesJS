import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuthActions } from '../useAuthActions.hook';

vi.mock('../actions/useLoginAction.hook', () => ({
  useLoginAction: vi.fn(() => 'mocked-login-action')
}));

vi.mock('../actions/useRegisterAction.hook', () => ({
  useRegisterAction: vi.fn(() => 'mocked-register-action')
}));

vi.mock('../actions/useForgotPasswordAction.hook', () => ({
  useForgotPasswordAction: vi.fn(() => 'mocked-forgot-password-action')
}));

vi.mock('../actions/useLogoutAction.hook', () => ({
  useLogoutAction: vi.fn(() => 'mocked-logout-action')
}));

vi.mock('../actions/useGoogleLoginAction.hook', () => ({
  useGoogleLoginAction: vi.fn(() => 'mocked-google-login-action')
}));

vi.mock('../actions/useResetPasswordAction.hook', () => ({
  useResetPasswordAction: vi.fn(() => 'mocked-reset-password-action')
}));

describe('useAuthActions', () => {
  const mockState = {
    setLoading: vi.fn(),
    setError: vi.fn(),
    setIsAuthenticated: vi.fn(),
    setUser: vi.fn(),
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null
  };

  it("should return all authentication actions", () => {
    const { result } = renderHook(() => useAuthActions(mockState));

    expect(result.current).toEqual({
      login: 'mocked-login-action',
      register: 'mocked-register-action',
      forgotPassword: 'mocked-forgot-password-action',
      logout: 'mocked-logout-action',
      loginWithGoogle: 'mocked-google-login-action',
      resetPassword: 'mocked-reset-password-action'
    });
  });
}); 