import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormData, forgotPasswordSchema } from '../../../../schemas/auth.schema';
import { useAuth } from '../../hooks/useAuth.hook';
import { useFormStatus } from '../../../Auth/hooks/useFormStatus.hook';

export const useForgotPasswordForm = () => {
  const { forgotPassword, loading, error } = useAuth();
  const formStatus = useFormStatus({ initialError: error });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      formStatus.resetStatus();
      const message = await forgotPassword(data.email);
      formStatus.setSuccess(message);
      reset();
    } catch (error) {
      formStatus.handleError(error);
    }
  };

  return {
    register,
    errors,
    loading,
    handleSubmit: handleSubmit(onSubmit),
    ...formStatus,
  };
};
