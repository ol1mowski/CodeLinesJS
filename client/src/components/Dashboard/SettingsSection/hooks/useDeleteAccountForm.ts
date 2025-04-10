import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../api/account";
import { useAuth } from "../../../../hooks/useAuth";

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  confirmation: z.string().refine(val => val === "USUŃ KONTO", {
    message: "Wpisz dokładnie 'USUŃ KONTO' aby potwierdzić"
  })
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

type UseDeleteAccountFormProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteAccountForm = ({ onSuccess, onError }: UseDeleteAccountFormProps = {}) => {
  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });
  
  const { token } = useAuth();

  const deleteAccountMutation = useMutation({
    mutationFn: (data: DeleteAccountFormData) => deleteAccount(data, token || ''),
    onSuccess: () => {
      form.reset();
      onSuccess?.();
      window.location.href = '/logowanie';
    },
    onError
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await deleteAccountMutation.mutateAsync(data);
  });

  return {
    form,
    onSubmit: handleSubmit,
    isDeleting: deleteAccountMutation.isPending
  };
}; 