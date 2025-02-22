import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { updatePassword } from "../api/security";
import { securitySchema } from "../schemas/security";

export const useSecurityForm = ({ onSuccess, onError }: UseSecurityFormProps = {}) => {
  const { token } = useAuth();
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: SecurityFormData) => updatePassword(data, token || ''),
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
    onError
  });

  return {
    form,
    onSubmit: form.handleSubmit((data) => updatePasswordMutation.mutateAsync(data)),
    isUpdating: updatePasswordMutation.isPending
  };
}; 