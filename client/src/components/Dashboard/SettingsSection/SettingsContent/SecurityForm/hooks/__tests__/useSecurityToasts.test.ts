import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSecurityToasts } from '../useSecurityToasts';
import { SecurityError } from '../../../../api/security';
import { toast } from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useSecurityToasts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles success correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());

    result.current.handleSuccess();
    expect(toast.success).toHaveBeenCalledWith('Hasło zostało zmienione');
  });

  it('handles invalid password error correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());

    result.current.handleError(
      new SecurityError('INVALID_CURRENT_PASSWORD', 'Invalid current password')
    );
    expect(toast.error).toHaveBeenCalledWith('Invalid current password');
  });

  it('handles general error correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());

    result.current.handleError(new Error('Unknown error'));
    expect(toast.error).toHaveBeenCalledWith('Wystąpił błąd podczas zmiany hasła');
  });

  it('handles cancel correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());

    result.current.handleCancel();
    expect(toast.success).toHaveBeenCalledWith('Zmiany zostały anulowane');
  });

  it('handles cancel error correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());

    result.current.handleCancelError();
    expect(toast.error).toHaveBeenCalledWith('Nie udało się anulować zmian');
  });
});
