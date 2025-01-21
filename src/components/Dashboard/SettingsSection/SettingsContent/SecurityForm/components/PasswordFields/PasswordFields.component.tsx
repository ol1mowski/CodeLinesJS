import { memo } from 'react';
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../../../UI/Form/FormInput/FormInput.component";
import type { UseFormReturn } from 'react-hook-form';
import type { SecurityFormData } from '../../../../types/security';

type PasswordFieldsProps = {
  form: UseFormReturn<SecurityFormData>;
}

export const PasswordFields = memo(({ form }: PasswordFieldsProps) => {
  return (
    <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-js/10 space-y-6">
      <div className="space-y-1">
        <label 
          htmlFor="currentPassword"
          className="block text-sm font-medium text-gray-400"
        >
          Aktualne hasło
        </label>
        <FormInput
          id="currentPassword"
          type="password"
          placeholder="Wprowadź aktualne hasło"
          icon={<FaLock />}
          error={form.formState?.errors?.currentPassword?.message || undefined}
          {...form.register("currentPassword")}
        />
      </div>

      <div className="space-y-1">
        <label 
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-400"
        >
          Nowe hasło
        </label>
        <FormInput
          id="newPassword"
          type="password"
          placeholder="Wprowadź nowe hasło"
          icon={<FaLock />}
          error={form.formState.errors.newPassword?.message}
          {...form.register("newPassword")}
        />
      </div>

      <div className="space-y-1">
        <label 
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-400"
        >
          Potwierdź nowe hasło
        </label>
        <FormInput
          id="confirmPassword"
          type="password"
          placeholder="Wprowadź ponownie nowe hasło"
          icon={<FaLock />}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
      </div>
    </div>
  );
});

PasswordFields.displayName = 'PasswordFields'; 