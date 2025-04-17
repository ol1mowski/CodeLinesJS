import { memo } from 'react';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FormInput } from '../../../../../../UI/Form/FormInput/FormInput.component';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../../../../UI/Button/Button.component';
import { styles } from './style/ConfirmationForm.styles';

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

export const ConfirmationForm = memo(
  ({ register, errors, isSubmitting, onCancel, onSubmit }: ConfirmationFormProps) => (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.form}
      onSubmit={onSubmit}
    >
      <FormInput
        id="password"
        type="password"
        label="Hasło"
        placeholder="Wprowadź hasło aby potwierdzić"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register('password')}
      />

      <div className={styles.confirmationField}>
        <label htmlFor="confirmation" className={styles.label}>
          Potwierdzenie
        </label>
        <p className={styles.hint}>Wpisz "USUŃ KONTO" aby potwierdzić</p>
        <input
          id="confirmation"
          type="text"
          {...register('confirmation')}
          className={styles.input}
        />
        {errors.confirmation && <p className={styles.error}>{errors.confirmation.message}</p>}
      </div>

      <div className={styles.buttons}>
        <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              <span>Usuwanie</span>
            </div>
          ) : (
            'Definitywnie usuń konto'
          )}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={styles.cancelButton}
        >
          Anuluj
        </Button>
      </div>
    </motion.form>
  )
);

ConfirmationForm.displayName = 'ConfirmationForm';
