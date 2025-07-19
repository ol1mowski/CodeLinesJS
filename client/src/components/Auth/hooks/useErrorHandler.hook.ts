import { useCallback } from 'react';
import { AUTH_ERROR_MESSAGES } from '../constants/messages';

type ErrorHandlerOptions = {
  showToasts?: boolean;
  onError?: (message: string) => void;
};

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { onError } = options;

  const parseError = useCallback((error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    if (error && typeof error === 'object') {
      const errorObj = error as any;
      return (
        errorObj.message || 
        errorObj.error || 
        (errorObj.errors && errorObj.errors[0]?.message) || 
        AUTH_ERROR_MESSAGES.UNKNOWN_ERROR
      );
    }
    
    return AUTH_ERROR_MESSAGES.UNKNOWN_ERROR;
  }, []);

  const handleError = useCallback(
    (error: unknown): string => {
      const message = parseError(error);
      
      if (onError) {
        onError(message);
      }
      
      return message;
    },
    [parseError, onError]
  );

  const handleApiError = useCallback(
    (error: unknown): string => {
      const message = parseError(error);
      
      if (onError) {
        onError(message);
      }
      
      return message;
    },
    [parseError, onError]
  );

  return {
    parseError,
    handleError,
    handleApiError,
  };
}; 