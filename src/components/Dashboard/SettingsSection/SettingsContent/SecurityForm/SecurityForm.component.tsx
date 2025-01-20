import { memo } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { useSecurityForm } from "../../hooks/useSecurityForm";
import { FormButtons } from "../../components/Profile/FormButtons/FormButtons.component";

import { useToast } from "../../contexts/ToastContext";
import { SecurityError } from "../../utils/api/security";

export const SecurityForm = memo(() => {
  const { showToast } = useToast();
  const { form, onSubmit, isUpdating } = useSecurityForm({
    onSuccess: () => {
      showToast('Hasło zostało zmienione', 'success');
      form.reset();
    },
    onError: (error) => {
      if (error instanceof SecurityError) {
        switch (error.code) {
          case 'INVALID_CURRENT_PASSWORD':
            showToast('Aktualne hasło jest nieprawidłowe', 'error');
            return;
        }
      }
      showToast('Wystąpił błąd podczas zmiany hasła', 'error');
    }
  });

  const handleCancel = () => {
    try {
      form.reset();
      showToast('Zmiany zostały anulowane', 'success');
    } catch (error) {
      showToast('Nie udało się anulować zmian', 'error');
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="w-full max-w-md sm:ml-0 sm:mr-auto space-y-8 px-4 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-js/10 space-y-6">
        <FormInput
          type="password"
          label="Aktualne hasło"
          placeholder="Wprowadź aktualne hasło"
          icon={<FaLock />}
          error={form.formState.errors.currentPassword?.message}
          {...form.register("currentPassword")}
        />

        <FormInput
          type="password"
          label="Nowe hasło"
          placeholder="Wprowadź nowe hasło"
          icon={<FaLock />}
          error={form.formState.errors.newPassword?.message}
          {...form.register("newPassword")}
        />

        <FormInput
          type="password"
          label="Potwierdź nowe hasło"
          placeholder="Wprowadź ponownie nowe hasło"
          icon={<FaLock />}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
      </div>

      <FormButtons 
        onCancel={handleCancel}
        isSubmitting={form.formState.isSubmitting || isUpdating}
        submitText="Zmień hasło"
        loadingText="Zmienianie hasła"
      />
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 