import { memo } from 'react';
import { FaLock } from "react-icons/fa";
import type { UseFormReturn, FieldErrors } from 'react-hook-form';
import type { SecurityFormData } from '../../schema/security.schema';
import { FormInput } from '../../../../../../UI/Form/FormInput/FormInput.component';

interface PasswordFieldsProps {
  form: UseFormReturn<SecurityFormData>;
  errors: FieldErrors<SecurityFormData>;
}

export const PasswordFields = memo(({ form, errors }: PasswordFieldsProps) => {
  const { register } = form;

  return (
    <div className="space-y-6">
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
        label="Powtórz nowe hasło"
        placeholder="Powtórz nowe hasło"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
    </div>
  );
});

PasswordFields.displayName = 'PasswordFields'; 