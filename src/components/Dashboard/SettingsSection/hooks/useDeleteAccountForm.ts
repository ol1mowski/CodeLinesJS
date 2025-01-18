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

export const useDeleteAccountForm = () => {
  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await deleteAccountMutation.mutateAsync(data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  });

  return {
    form,
    onSubmit: handleSubmit,
    isDeleting: deleteAccountMutation.isPending
  };
}; 