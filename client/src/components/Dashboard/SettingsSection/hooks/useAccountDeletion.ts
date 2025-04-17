import { useCallback } from 'react';
import { useDeleteAccountForm } from './useDeleteAccountForm';
import { AccountError } from '../api/account';
import { toast } from 'react-hot-toast';

export const useAccountDeletion = (onCancel: () => void) => {
  const handleSuccess = useCallback(() => {
    toast.success('Konto zostało usunięte');
  }, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AccountError) {
      switch (error.code) {
        case 'INVALID_PASSWORD':
          toast.error('Podane hasło jest nieprawidłowe');
          return;
        case 'INVALID_CONFIRMATION':
          toast.error('Nieprawidłowe potwierdzenie');
          return;
      }
    }
    toast.error('Nie udało się usunąć konta');
  }, []);

  const handleCancel = useCallback(() => {
    try {
      onCancel();
      toast.success('Operacja została anulowana');
    } catch (error) {
      toast.error('Nie udało się anulować operacji');
    }
  }, [onCancel]);

  const { form, onSubmit, isDeleting } = useDeleteAccountForm({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    form,
    onSubmit,
    isDeleting,
    handleCancel,
  };
};
