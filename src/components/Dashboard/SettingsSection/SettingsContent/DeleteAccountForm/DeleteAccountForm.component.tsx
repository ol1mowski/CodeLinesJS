import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../UI/Button/Button.component";
import { useDeleteAccountForm } from "../../hooks/useDeleteAccountForm";
import { WarningBox } from "../../components/DeleteAccount/WarningBox/WarningBox.component";
import { ConfirmationForm } from "../../components/DeleteAccount/ConfirmationForm/ConfirmationForm.component";

export const DeleteAccountForm = memo(() => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { form, onSubmit, isDeleting } = useDeleteAccountForm();
  
  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
    form.reset();
  }, [form]);

  const handleShowConfirmation = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  if (!showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-1/4"
      >
        <WarningBox />
        <Button
          type="button"
          onClick={handleShowConfirmation}
          className="w-full px-6 py-2 rounded-lg bg-red-500/20 text-red-400 
            hover:bg-red-500/30 transition-colors duration-200 shadow-none"
        >
          Chcę usunąć konto
        </Button>
      </motion.div>
    );
  }

  return (
    <ConfirmationForm
      register={form.register}
      errors={form.formState.errors}
      isSubmitting={isDeleting}
      onCancel={handleCancel}
      onSubmit={onSubmit}
    />
  );
});

DeleteAccountForm.displayName = "DeleteAccountForm"; 