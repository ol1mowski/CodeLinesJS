import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  language: z.literal("pl"),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

interface UsePreferencesFormProps {
  onSubmit: (data: PreferencesFormData) => Promise<void>;
  defaultValues?: Partial<PreferencesFormData>;
}

export const usePreferencesForm = ({ onSubmit, defaultValues }: UsePreferencesFormProps) => {
  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues,
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