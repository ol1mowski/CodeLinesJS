import { useCallback } from 'react';
import { SecurityError } from '../../../api/security';
import { toast } from 'react-hot-toast';

export const useSecurityToasts = () => {
  const handleSuccess = useCallback(() => {
    toast.success('Hasło zostało zmienione');
  }, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof SecurityError) {
      toast.error(error.message);
      return;
    }
    
    toast.error('Wystąpił błąd podczas zmiany hasła');
  }, []);

  const handleCancel = useCallback(() => {
    toast.success('Zmiany zostały anulowane');
  }, []);

  const handleCancelError = useCallback(() => {
    toast.error('Nie udało się anulować zmian');
  }, []);

  return {
    handleSuccess,
    handleError,
    handleCancel,
    handleCancelError,
  };
};
