import { useAuth } from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/security";
import { z } from "zod";

export type SecurityFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UseSecurityFormProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const securitySchema = z.object({
  currentPassword: z.string()
    .min(1, "Aktualne hasło jest wymagane"),
  newPassword: z.string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .max(50, "Hasło może mieć maksymalnie 50 znaków"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła nie są identyczne",
  path: ["confirmPassword"]
});

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