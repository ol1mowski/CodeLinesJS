import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../UI/Button/Button.component";
import { useDeleteAccountForm } from "../../hooks/useDeleteAccountForm";
import { WarningBox } from "../../components/DeleteAccount/WarningBox/WarningBox.component";
import { ConfirmationForm } from "../../components/DeleteAccount/ConfirmationForm/ConfirmationForm.component";
import { styles } from "../../components/DeleteAccount/WarningBox/WarningBox.styles";


export const DeleteAccountForm = memo(() => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { form, onSubmit } = useDeleteAccountForm();
  
  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleShowConfirmation = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  if (!showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        <WarningBox />
        <Button
          type="button"
          onClick={handleShowConfirmation}
          className="w-full px-6 py-2 rounded-lg bg-red-500/20 text-red-400 
            hover:bg-red-500/30 transition-colors duration-200"
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
      isSubmitting={form.formState.isSubmitting}
      onCancel={handleCancel}
      onSubmit={onSubmit}
    />
  );
});

DeleteAccountForm.displayName = "DeleteAccountForm"; 