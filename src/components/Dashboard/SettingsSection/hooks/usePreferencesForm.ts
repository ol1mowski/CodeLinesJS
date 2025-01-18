import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "../utils/validationSchemas";
import type { PreferencesData } from "../types/settings";

export const usePreferencesForm = (defaultValues: PreferencesData) => {
  const form = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues
  });

  const onSubmit = async (data: PreferencesData) => {
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