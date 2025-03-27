import { useState, useEffect } from 'react';

type FormStatusProps = {
  initialError?: string | null;
  resetOnSuccess?: boolean;
};

export const useFormStatus = ({ initialError = null }: FormStatusProps = {}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  useEffect(() => {
    if (initialError !== undefined && initialError !== null) {
      setErrorMessage(initialError);
    }
  }, [initialError]);

  const setSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  const setError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

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