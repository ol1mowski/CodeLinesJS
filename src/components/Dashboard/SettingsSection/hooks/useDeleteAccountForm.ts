import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../utils/validationSchemas";
import type { DeleteAccountFormData } from "../types/forms";

export const useDeleteAccountForm = () => {
  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });

  const onSubmit = async (data: DeleteAccountFormData) => {
    try {
      // TODO: Implement API call
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
}; 