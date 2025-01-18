import { memo } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { useSecurityForm } from "../../hooks/useSecurityForm";
import { styles } from "./SecurityForm.styles";


export const SecurityForm = memo(() => {
  const { form, onSubmit } = useSecurityForm();
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
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.cancelButton}
        >
          Anuluj
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.submitButton}
        >
          Zmień hasło
        </motion.button>
      </div>
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 