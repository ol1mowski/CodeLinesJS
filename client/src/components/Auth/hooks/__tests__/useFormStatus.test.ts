import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormStatus } from '../useFormStatus.hook';

describe('useFormStatus', () => {
  it('should have default empty state', () => {
    const { result } = renderHook(() => useFormStatus());

    expect(result.current.successMessage).toBeNull();
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.hasSuccess).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('should set initial error if provided', () => {
    const initialError = 'Initial error';
    const { result } = renderHook(() => useFormStatus({ initialError }));

    expect(result.current.errorMessage).toBe(initialError);
    expect(result.current.hasError).toBe(true);
    expect(result.current.successMessage).toBeNull();
    expect(result.current.hasSuccess).toBe(false);
  });

  it('should set success message and clear error', () => {
    const { result } = renderHook(() => useFormStatus({ initialError: 'Initial error' }));

    act(() => {
      result.current.setSuccess('Operacja zakończona sukcesem');
    });

    expect(result.current.successMessage).toBe('Operacja zakończona sukcesem');
    expect(result.current.hasSuccess).toBe(true);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.hasError).toBe(false);
  });

  it('should set error message and clear success', () => {
    const { result } = renderHook(() => useFormStatus());

    act(() => {
      result.current.setSuccess('Operacja zakończona sukcesem');
    });

    act(() => {
      result.current.setError('Wystąpił błąd');
    });

    expect(result.current.errorMessage).toBe('Wystąpił błąd');
    expect(result.current.hasError).toBe(true);
    expect(result.current.successMessage).toBeNull();
    expect(result.current.hasSuccess).toBe(false);
  });

  it('should handle different types of errors', () => {
    const { result } = renderHook(() => useFormStatus());

    act(() => {
      result.current.handleError(new Error('Błąd JavaScript'));
    });

    expect(result.current.errorMessage).toBe('Błąd JavaScript');

    act(() => {
      result.current.handleError('Błąd tekstowy');
    });

    expect(result.current.errorMessage).toBe('Błąd tekstowy');

    act(() => {
      result.current.handleError({ nieznany: 'błąd' });
    });

    expect(result.current.errorMessage).toBe('Wystąpił nieznany błąd. Spróbuj ponownie później.');
  });

  it('should reset status', () => {
    const { result } = renderHook(() => useFormStatus({ initialError: 'Initial error' }));

    act(() => {
      result.current.resetStatus();
    });

    expect(result.current.successMessage).toBeNull();
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.hasSuccess).toBe(false);
    expect(result.current.hasError).toBe(false);
  });
});
