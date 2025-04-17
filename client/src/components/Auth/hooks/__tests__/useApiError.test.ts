import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApiError } from '../useApiError.hook';

describe('useApiError', () => {
  it('should have default empty error state', () => {
    const { result } = renderHook(() => useApiError());

    expect(result.current.errorMessage).toBeNull();
  });

  it('should handle Response type error', () => {
    const { result } = renderHook(() => useApiError());
    const mockResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    act(() => {
      result.current.handleApiError(mockResponse);
    });

    expect(result.current.errorMessage).toBe('Błąd serwera: 404 Not Found');
  });

  it('should handle error with error field', () => {
    const { result } = renderHook(() => useApiError());
    const mockError = { error: 'Nieprawidłowe dane uwierzytelniające' };

    act(() => {
      result.current.handleApiError(mockError);
    });

    expect(result.current.errorMessage).toBe('Nieprawidłowe dane uwierzytelniające');
  });

  it('should handle error with message field', () => {
    const { result } = renderHook(() => useApiError());
    const mockError = { message: 'Użytkownik o podanym adresie email już istnieje' };

    act(() => {
      result.current.handleApiError(mockError);
    });

    expect(result.current.errorMessage).toBe('Użytkownik o podanym adresie email już istnieje');
  });

  it('should handle error with errors field (validation)', () => {
    const { result } = renderHook(() => useApiError());
    const mockError = {
      errors: {
        email: ['Email jest wymagany', 'Email musi być prawidłowym adresem email'],
        password: ['Hasło musi mieć co najmniej 8 znaków'],
      },
    };

    act(() => {
      result.current.handleApiError(mockError);
    });

    expect(result.current.errorMessage).toBe(
      'Email jest wymagany. Email musi być prawidłowym adresem email. Hasło musi mieć co najmniej 8 znaków'
    );
  });

  it('should handle Error type error', () => {
    const { result } = renderHook(() => useApiError());
    const mockError = new Error('Błąd połączenia z serwerem');

    act(() => {
      result.current.handleApiError(mockError);
    });

    expect(result.current.errorMessage).toBe('Błąd połączenia z serwerem');
  });

  it('should handle string type error', () => {
    const { result } = renderHook(() => useApiError());

    act(() => {
      result.current.handleApiError('Nieprawidłowy token');
    });

    expect(result.current.errorMessage).toBe('Nieprawidłowy token');
  });

  it('should handle unknown type error', () => {
    const { result } = renderHook(() => useApiError());

    act(() => {
      result.current.handleApiError(null);
    });

    expect(result.current.errorMessage).toBe('Wystąpił nieznany błąd. Spróbuj ponownie później.');
  });

  it('should reset error', () => {
    const { result } = renderHook(() => useApiError());

    act(() => {
      result.current.handleApiError('Błąd testowy');
    });

    expect(result.current.errorMessage).toBe('Błąd testowy');

    act(() => {
      result.current.resetError();
    });

    expect(result.current.errorMessage).toBeNull();
  });

  it('should allow manual setting of error message', () => {
    const { result } = renderHook(() => useApiError());

    act(() => {
      result.current.setErrorMessage('Ręcznie ustawiony błąd');
    });

    expect(result.current.errorMessage).toBe('Ręcznie ustawiony błąd');
  });
});
