import { useCallback } from 'react';
import { useDeleteAccountForm } from './useDeleteAccountForm';
import { useToast } from '../contexts/ToastContext';
import { AccountError } from '../utils/api/account';

export const useAccountDeletion = (onCancel: () => void) => {
  const { showToast } = useToast();

  const handleSuccess = useCallback(() => {
    showToast('Konto zostało usunięte', 'success');
  }, [showToast]);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AccountError) {
      switch (error.code) {
        case 'INVALID_PASSWORD':
          showToast('Podane hasło jest nieprawidłowe', 'error');
          return;
        case 'INVALID_CONFIRMATION':
          showToast('Nieprawidłowe potwierdzenie', 'error');
          return;
      }
    }
    showToast('Nie udało się usunąć konta', 'error');
  }, [showToast]);

  const handleCancel = useCallback(() => {
    try {
      onCancel();
      showToast('Operacja została anulowana', 'success');
    } catch (error) {
      showToast('Nie udało się anulować operacji', 'error');
    }
  }, [onCancel, showToast]);

  const { form, onSubmit, isDeleting } = useDeleteAccountForm({
    onSuccess: handleSuccess,
    onError: handleError
  });

  return {
    form,
    onSubmit,
    isDeleting,
    handleCancel
  };
}; 