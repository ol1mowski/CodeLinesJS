import { RegisterFormData, registerSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../hooks/useAuth";
import { useFormValidator } from "../../hooks/useFormValidator.hook";
import { useState } from "react";

export const useRegisterForm = () => {
  const { register: registerUser, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useFormValidator<RegisterFormData>({
    schema: registerSchema,
    mode: "onChange",
    defaultValues: {
      acceptPrivacy: false
    },
    async onSuccess(data) {
      try {
        setSubmitting(true);
        await registerUser(data.email, data.password, data.username);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    loading: loading || submitting || form.isSubmitting,
    handleSubmit: form.onFormSubmit,
    errorMessage: form.errorMessage,
    successMessage: form.successMessage
  };
}; 