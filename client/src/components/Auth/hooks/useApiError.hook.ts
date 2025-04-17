import { useState, useCallback } from 'react';

type ApiErrorResponse = {
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
};

export const useApiError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const parseApiError = useCallback((error: unknown): string => {
    if (error instanceof Response) {
      return `Błąd serwera: ${error.status} ${error.statusText}`;
    }

    if (error && typeof error === 'object') {
      const apiError = error as ApiErrorResponse;

      if (apiError.error && typeof apiError.error === 'string') {
        return apiError.error;
      }

      if (apiError.message && typeof apiError.message === 'string') {
        return apiError.message;
      }

      if (apiError.errors) {
        const errorMessages = Object.values(apiError.errors).flat().filter(Boolean);

        if (errorMessages.length > 0) {
          return errorMessages.join('. ');
        }
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Wystąpił nieznany błąd. Spróbuj ponownie później.';
  }, []);

  const handleApiError = useCallback(
    (error: unknown) => {
      const message = parseApiError(error);
      setErrorMessage(message);
      return message;
    },
    [parseApiError]
  );

  const resetError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    errorMessage,
    handleApiError,
    parseApiError,
    resetError,
    setErrorMessage,
  };
};
