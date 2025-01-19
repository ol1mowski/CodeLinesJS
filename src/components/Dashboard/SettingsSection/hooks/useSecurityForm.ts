import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../utils/api/security";

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
  newPassword: z.string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła nie są takie same",
  path: ["confirmPassword"],
});

type SecurityFormData = z.infer<typeof securitySchema>;

interface UseSecurityFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useSecurityForm = ({ onSuccess, onError }: UseSecurityFormProps = {}) => {
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updatePasswordMutation.mutateAsync(data);
  });

  return {
    form,
    onSubmit: handleSubmit,
    isUpdating: updatePasswordMutation.isPending,
  };
}; 