import { memo } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { useSecurityForm } from "../../hooks/useSecurityForm";
import { styles } from "./SecurityForm.styles";

export const SecurityForm = memo(() => {
  const { form, onSubmit, isUpdating } = useSecurityForm();
  const { register, formState: { errors } } = form;

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
          className={styles.cancelButton}
        >
          Anuluj
        </button>

        <button
          type="submit"
          disabled={isUpdating}
          className={styles.submitButton}
        >
          {isUpdating ? "Zapisywanie..." : "Zmień hasło"}
        </button>
      </div>
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 