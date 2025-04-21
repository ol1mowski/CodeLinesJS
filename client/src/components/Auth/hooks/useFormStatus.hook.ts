import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

type FormStatusProps = {
  initialError?: string | null;
  resetOnSuccess?: boolean;
  showToasts?: boolean;
};

export const useFormStatus = ({
  initialError = null,
  resetOnSuccess = true,
  showToasts = true,
}: FormStatusProps = {}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  useEffect(() => {
    if (initialError !== undefined && initialError !== null) {
      setErrorMessage(initialError);
    }
  }, [initialError]);

  const setSuccess = useCallback(
    (message: string) => {
      setSuccessMessage(message);
      setErrorMessage(null);

      if (showToasts) {
        toast.success(message);
      }

      if (resetOnSuccess) {
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    },
    [resetOnSuccess, showToasts]
  );

  const setError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setSuccessMessage(null);

      if (showToasts) {
        toast.error(message);
      }
    },
    [showToasts]
  );

  const handleError = useCallback(
    (error: unknown): string => {
      let message = '';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object') {
        const errorObj = error as any;
        message = 
          errorObj.message || 
          errorObj.error || 
          (errorObj.errors && errorObj.errors[0]?.message) || 
          'Wystąpił nieznany błąd. Spróbuj ponownie później.';
      } else {
        message = 'Wystąpił nieznany błąd. Spróbuj ponownie później.';
      }

      setError(message);
      return message;
    },
    [setError]
  );

  const resetStatus = useCallback(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  return {
    successMessage,
    errorMessage,
    setSuccess,
    setError,
    handleError,
    resetStatus,
    hasSuccess: !!successMessage,
    hasError: !!errorMessage,
  };
};
