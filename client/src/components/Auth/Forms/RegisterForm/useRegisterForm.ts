import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { useFormStatus } from "../../../Auth/hooks/useFormStatus.hook";

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
      formStatus.handleError(error);
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