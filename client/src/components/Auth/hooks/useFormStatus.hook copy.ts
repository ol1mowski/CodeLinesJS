import { useEffect, useState } from 'react';
import { useApiError } from './useApiError.hook';

type FormStatusProps = {
  initialError?: string | null;
  resetOnSuccess?: boolean;
};

export const useFormStatus = ({ initialError = null }: FormStatusProps = {}) => {
  const { 
    errorMessage, 
    handleApiError, 
    parseApiError, 
    resetError, 
    setErrorMessage 
  } = useApiError();
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialError !== undefined && initialError !== null) {
      setErrorMessage(initialError);
    }
  }, [initialError, setErrorMessage]);

  const setSuccess = (message: string) => {
    setSuccessMessage(message);
    resetError();
  };

  const setError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  const handleError = (error: unknown) => {
    setSuccessMessage(null);
    return handleApiError(error);
  };

  const resetStatus = () => {
    setSuccessMessage(null);
    resetError();
  };

  return {
    successMessage,
    errorMessage,
    setSuccess,
    setError,
    handleError,
    parseApiError,
    resetStatus,
    hasSuccess: !!successMessage,
    hasError: !!errorMessage
  };
}; 