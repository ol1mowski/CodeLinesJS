import { describe, it, expect, vi, beforeEach, MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSecurityToasts } from '../useSecurityToasts';
import { SecurityError } from '../../../../api/security';

vi.mock('../../../../contexts/ToastContext', () => ({
  useToast: vi.fn()
}));

describe('useSecurityToasts', () => {
  const mockShowToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles success correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());
    
    result.current.handleSuccess();
    expect(mockShowToast).toHaveBeenCalledWith('Hasło zostało zmienione', 'success');
  });

it("handles invalid password error correctly", () => {
  const { result } = renderHook(() => useSecurityToasts());

  result.current.handleError(
    new SecurityError("INVALID_CURRENT_PASSWORD", "Invalid current password")
  );
  expect(mockShowToast).toHaveBeenCalledWith(
    "Aktualne hasło jest nieprawidłowe",
    "error"
  );
});


  it('handles general error correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());
    
    result.current.handleError(new Error('Unknown error'));
    expect(mockShowToast).toHaveBeenCalledWith('Wystąpił błąd podczas zmiany hasła', 'error');
  });

  it('handles cancel correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());
    
    result.current.handleCancel();
    expect(mockShowToast).toHaveBeenCalledWith('Zmiany zostały anulowane', 'success');
  });

  it('handles cancel error correctly', () => {
    const { result } = renderHook(() => useSecurityToasts());
    
    result.current.handleCancelError();
    expect(mockShowToast).toHaveBeenCalledWith('Nie udało się anulować zmian', 'error');
  });
}); 