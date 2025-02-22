import { memo } from 'react';
import { FaLock } from "react-icons/fa";
import type { UseFormReturn } from 'react-hook-form';
import type { SecurityFormData } from '../../schema/security.schema';
import { FormInput } from '../../../../../../UI/Form/FormInput/FormInput.component';

type PasswordFieldsProps = {
  form: UseFormReturn<SecurityFormData>;
}

export const PasswordFields = memo(({ form }: PasswordFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-js/10 space-y-6">
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
        placeholder="Wprowadź ponownie nowe hasło"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
    </div>
  );
});

PasswordFields.displayName = 'PasswordFields'; 