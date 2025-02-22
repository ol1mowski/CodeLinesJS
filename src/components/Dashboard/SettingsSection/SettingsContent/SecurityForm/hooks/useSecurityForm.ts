import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { securitySchema, type SecurityFormData } from "../schema/security.schema";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../api/security";
import { useAuth } from "../../../../../../hooks/useAuth";

type UseSecurityFormProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useSecurityForm = ({ onSuccess, onError }: UseSecurityFormProps = {}) => {
  const { token } = useAuth();
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: SecurityFormData) => updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }, token || ''),
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