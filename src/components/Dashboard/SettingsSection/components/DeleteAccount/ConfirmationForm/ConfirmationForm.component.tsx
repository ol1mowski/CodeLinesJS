import { memo } from "react";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { FormInput } from "../../../../../UI/Form/FormInput/FormInput.component";
import { UseFormRegister } from "react-hook-form";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./ConfirmationForm.styles";

interface ConfirmationFormProps {
  register: UseFormRegister<any>;
  errors: {
    password?: { message?: string };
    confirmation?: { message?: string };
  };
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ConfirmationForm = memo(({
  register,
  errors,
  isSubmitting,
  onCancel,
  onSubmit
}: ConfirmationFormProps) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={styles.form}
    onSubmit={onSubmit}
  >
    <FormInput
      type="password"
      label="Hasło"
      placeholder="Wprowadź hasło aby potwierdzić"
      icon={<FaLock />}
      error={errors.password?.message}
      {...register("password")}
    />

    <div className={styles.confirmationField}>
      <label className={styles.label}>
        Potwierdzenie
      </label>
      <p className={styles.hint}>
        Wpisz "USUŃ KONTO" aby potwierdzić
      </p>
      <input
        type="text"
        {...register("confirmation")}
        className={styles.input}
      />
      {errors.confirmation && (
        <p className={styles.error}>
          {errors.confirmation.message}
        </p>
      )}
    </div>

    <div className={styles.buttons}>
      <Button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Usuwanie..." : "Usuń konto permanentnie"}
      </Button>
      <button
        type="button"
        onClick={onCancel}
        className={styles.cancelButton}
      >
        Anuluj
      </button>
    </div>
  </motion.form>
));

ConfirmationForm.displayName = "ConfirmationForm"; 