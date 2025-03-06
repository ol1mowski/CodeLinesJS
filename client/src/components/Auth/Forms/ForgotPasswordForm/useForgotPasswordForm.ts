import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { useFormStatus } from "../../hooks/useFormStatus.hook";

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
      if (error instanceof Error) {
        formStatus.setError(error.message);
      } else {
        formStatus.setError("Wystąpił nieznany błąd podczas wysyłania linku resetującego hasło");
      }
    }
  };

  return {
    register,
    errors,
    loading,
    handleSubmit: handleSubmit(onSubmit),
    ...formStatus
  };
}; 