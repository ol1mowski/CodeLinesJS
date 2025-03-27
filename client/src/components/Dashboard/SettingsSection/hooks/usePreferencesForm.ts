import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PreferencesData } from "../types/settings";

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  language: z.literal("pl"),
});

interface UsePreferencesFormProps {
  onSubmit: (data: PreferencesData) => Promise<void>;
  defaultValues?: PreferencesData;
}

export const usePreferencesForm = ({ onSubmit, defaultValues }: UsePreferencesFormProps) => {
  const form = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: defaultValues || {
      emailNotifications: false,
      pushNotifications: false,
      language: "pl"
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  });

  return {
    form,
    onSubmit: handleSubmit,
  };
}; 