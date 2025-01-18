import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { securitySchema } from "../utils/validationSchemas";
import type { SecurityFormData } from "../types/forms";

export const useSecurityForm = () => {
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema)
  });

  const onSubmit = async (data: SecurityFormData) => {
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