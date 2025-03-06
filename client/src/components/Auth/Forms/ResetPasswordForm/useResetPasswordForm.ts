import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResetPasswordFormData, resetPasswordSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { useFormStatus } from "../../hooks/useFormStatus.hook";

export const useResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, loading, error: authError } = useAuth();
  const formStatus = useFormStatus({ initialError: authError });
  const [tokenError, setTokenError] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!token) {
      setTokenError(true);
      formStatus.setError("Brak tokenu resetowania hasła. Sprawdź, czy link jest poprawny.");
    } else if (token.length < 10) {
      setTokenError(true);
      formStatus.setError("Token resetowania hasła jest nieprawidłowy. Sprawdź, czy link jest poprawny.");
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      formStatus.setError("Brak tokenu resetowania hasła. Sprawdź, czy link jest poprawny.");
      return;
    }
    
    try {
      formStatus.resetStatus();
      const message = await resetPassword(token, data.password, data.confirmPassword);
      formStatus.setSuccess(message);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("token")) {
          formStatus.setError(err.message);
          setTokenError(true);
        } else {
          formStatus.setError(err.message);
        }
      } else {
        formStatus.setError("Wystąpił nieznany błąd podczas resetowania hasła. Spróbuj ponownie później.");
      }
    }
  };

  return {
    register,
    errors,
    loading,
    tokenError,
    handleSubmit: handleSubmit(onSubmit),
    ...formStatus
  };
}; 