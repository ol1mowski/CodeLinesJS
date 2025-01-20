import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../UI/Button/Button.component";
import { useDeleteAccountForm } from "../../hooks/useDeleteAccountForm";
import { WarningBox } from "../../components/DeleteAccount/WarningBox/WarningBox.component";
import { ConfirmationForm } from "../../components/DeleteAccount/ConfirmationForm/ConfirmationForm.component";
import { useToast } from "../../contexts/ToastContext";
import { AccountError } from "../../utils/api/account";

export const DeleteAccountForm = memo(() => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { showToast } = useToast();
  
  const { form, onSubmit, isDeleting } = useDeleteAccountForm({
    onSuccess: () => showToast('Konto zostało usunięte', 'success'),
    onError: (error) => {
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
    }
  });
  
  const handleCancel = useCallback(() => {
    try {
      setShowConfirmation(false);
      form.reset();
      showToast('Operacja została anulowana', 'success');
    } catch (error) {
      showToast('Nie udało się anulować operacji', 'error');
    }
  }, [form, showToast]);

  const handleShowConfirmation = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  if (!showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md mx-auto px-4 sm:px-0"
      >
        <WarningBox />
        <Button
          type="button"
          onClick={handleShowConfirmation}
          className="w-full px-6 py-3 rounded-lg bg-red-500/20 text-red-400 
            hover:bg-red-500/30 transition-colors duration-200 shadow-none
            text-base sm:text-lg font-medium"
        >
          Chcę usunąć konto
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto px-4 sm:px-0"
    >
      <ConfirmationForm
        register={form.register}
        errors={form.formState.errors}
        isSubmitting={isDeleting}
        onCancel={handleCancel}
        onSubmit={onSubmit}
      />
    </motion.div>
  );
});

DeleteAccountForm.displayName = "DeleteAccountForm"; 