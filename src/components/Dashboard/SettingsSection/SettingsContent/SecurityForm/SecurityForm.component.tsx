import { memo } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { useSecurityForm } from "../../hooks/useSecurityForm";
import { styles } from "./SecurityForm.styles";
import { useToast } from "../../contexts/ToastContext";
import { SecurityError } from "../../utils/api/security";

export const SecurityForm = memo(() => {
  const { showToast } = useToast();
  const { form, onSubmit, isUpdating } = useSecurityForm({
    onSuccess: () => showToast('Hasło zostało zmienione', 'success'),
    onError: (error) => {
      if (error instanceof SecurityError) {
        if (error.code === 'INVALID_CURRENT_PASSWORD') {
          showToast('Aktualne hasło jest nieprawidłowe', 'error');
          return;
        }
      }
      showToast('Nie udało się zmienić hasła', 'error');
    }
  });
  
  const { register, formState: { errors }, reset } = form;

  const handleCancel = () => {
    try {
      reset();
      showToast('Zmiany zostały anulowane', 'success');
    } catch (error) {
      showToast('Nie udało się anulować zmian', 'error');
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FormInput
        type="password"
        label="Aktualne hasło"
        placeholder="Wprowadź aktualne hasło"
        icon={<FaLock />}
        error={errors.currentPassword?.message}
        {...register("currentPassword")}
      />

      <FormInput
        type="password"
        label="Nowe hasło"
        placeholder="Wprowadź nowe hasło"
        icon={<FaLock />}
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />

      <FormInput
        type="password"
        label="Potwierdź nowe hasło"
        placeholder="Potwierdź nowe hasło"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelButton}
          disabled={isUpdating}
        >
          Anuluj zmiany
        </button>

        <button
          type="submit"
          disabled={isUpdating}
          className={styles.submitButton}
        >
          {isUpdating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              <span>Zapisywanie</span>
            </div>
          ) : (
            "Zmień hasło"
          )}
        </button>
      </div>
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 