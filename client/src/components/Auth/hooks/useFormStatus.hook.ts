import { useState, useEffect } from 'react';

type FormStatusProps = {
  initialError?: string | null;
};

export const useFormStatus = ({ initialError = null }: FormStatusProps = {}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  useEffect(() => {
    if (initialError !== undefined) {
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

  const resetStatus = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return {
    successMessage,
    errorMessage,
    setSuccess,
    setError,
    resetStatus,
    hasSuccess: !!successMessage,
    hasError: !!errorMessage
  };
}; 