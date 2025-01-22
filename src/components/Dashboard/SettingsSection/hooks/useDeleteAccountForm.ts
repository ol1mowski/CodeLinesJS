import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../utils/api/account";

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  confirmation: z.string().refine(val => val === "USUŃ KONTO", {
    message: "Wpisz dokładnie 'USUŃ KONTO' aby potwierdzić"
  })
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

interface UseDeleteAccountFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteAccountForm = ({ onSuccess, onError }: UseDeleteAccountFormProps = {}) => {
  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      form.reset();
      onSuccess?.();
      window.location.href = '/logowanie';
    },
    onError: (error) => {
      onError?.(error);
    }
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