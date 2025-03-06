import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { useFormStatus } from "../../hooks/useFormStatus.hook";

export const useRegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const formStatus = useFormStatus({ initialError: error });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      acceptPrivacy: false
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      formStatus.resetStatus();
      await registerUser(data.email, data.password, data.username);
    } catch (error) {
      if (error instanceof Error) {
        formStatus.setError(error.message);
      } else {
        formStatus.setError("Wystąpił nieznany błąd podczas rejestracji");
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