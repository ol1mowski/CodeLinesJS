import { useCallback } from 'react';
import { useToast } from '../../../contexts/ToastContext';
import { SecurityError } from '../../../utils/api/security';


export const useSecurityToasts = () => {
  const { showToast } = useToast();

  const handleSuccess = useCallback(() => {
    showToast('Hasło zostało zmienione', 'success');
  }, [showToast]);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof SecurityError) {
      switch (error.code) {
        case 'INVALID_CURRENT_PASSWORD':
          showToast('Aktualne hasło jest nieprawidłowe', 'error');
          return;
      }
    }
    showToast('Wystąpił błąd podczas zmiany hasła', 'error');
  }, [showToast]);

  const handleCancel = useCallback(() => {
    showToast('Zmiany zostały anulowane', 'success');
  }, [showToast]);

  const handleCancelError = useCallback(() => {
    showToast('Nie udało się anulować zmian', 'error');
  }, [showToast]);

  return {
    handleSuccess,
    handleError,
    handleCancel,
    handleCancelError
  };
}; 