import { memo } from 'react';
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../../UI/Form/FormInput/FormInput.component";
import type { UseFormReturn } from 'react-hook-form';
import type { SecurityFormData } from '../../../types/security';

interface PasswordFieldsProps {
  form: UseFormReturn<SecurityFormData>;
}

export const PasswordFields = memo(({ form }: PasswordFieldsProps) => {
  return (
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
  );
});

PasswordFields.displayName = 'PasswordFields'; 