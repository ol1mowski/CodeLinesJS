import { useState, useEffect } from 'react';

type FormStatusProps = {
  initialError?: string | null;
  resetOnSuccess?: boolean;
};

/**
 * Hook do zarządzania statusem formularza (komunikaty o sukcesie i błędach)
 */
export const useFormStatus = ({ initialError = null, resetOnSuccess = false }: FormStatusProps = {}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  // Aktualizacja błędu, gdy zmienia się initialError
  useEffect(() => {
    if (initialError !== undefined && initialError !== null) {
      setErrorMessage(initialError);
    }
  }, [initialError]);

  // Funkcja do ustawiania sukcesu
  const setSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  // Funkcja do ustawiania błędu
  const setError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  // Funkcja do obsługi błędu API
  const handleError = (error: unknown): string => {
    let message = '';
    
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Wystąpił nieznany błąd. Spróbuj ponownie później.';
    }
    
    setError(message);
    return message;
  };

  // Funkcja do resetowania statusu
  const resetStatus = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return {
    successMessage,
    errorMessage,
    setSuccess,
    setError,
    handleError,
    resetStatus,
    hasSuccess: !!successMessage,
    hasError: !!errorMessage
  };
}; 