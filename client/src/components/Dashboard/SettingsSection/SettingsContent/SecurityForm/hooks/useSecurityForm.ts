import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { securitySchema, type SecurityFormData } from '../schema/security.schema';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../../../api/security';

type UseSecurityFormProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useSecurityForm = ({ onSuccess, onError }: UseSecurityFormProps = {}) => {
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: SecurityFormData) =>
      updatePassword(
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      ),
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
    onError,
  });

  return {
    form,
    onSubmit: form.handleSubmit(data => updatePasswordMutation.mutateAsync(data)),
    isUpdating: updatePasswordMutation.isPending,
  };
};
