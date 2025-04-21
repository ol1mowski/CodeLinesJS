import { RegisterFormData, registerSchema } from '../../../../schemas/auth.schema';
import { useAuth } from '../../../../hooks/useAuth';
import { useFormValidator } from '../../hooks/useFormValidator.hook';
import { useState, useEffect } from 'react';

export const useRegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const form = useFormValidator<RegisterFormData>({
    schema: registerSchema,
    mode: 'onChange',
    defaultValues: {
      acceptPrivacy: false,
    },
    async onSuccess(data) {
      try {
        setSubmitting(true);
        setLocalError(null);
        await registerUser(data.email, data.password, data.username);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji';
        setLocalError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  return {
    register: form.register,
    errors: form.formState.errors,
    loading: loading || submitting || form.isSubmitting,
    handleSubmit: form.onFormSubmit,
    errorMessage: localError || error || form.errorMessage,
    successMessage: form.successMessage,
  };
};
