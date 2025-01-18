import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string()
    .min(3, "Nazwa użytkownika musi mieć minimum 3 znaki")
    .max(20, "Nazwa użytkownika może mieć maksymalnie 20 znaków"),
  email: z.string()
    .email("Nieprawidłowy adres email"),
  bio: z.string()
    .max(160, "Bio może mieć maksymalnie 160 znaków")
    .optional(),
  avatarUrl: z.string().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UseProfileFormProps {
  onSubmit: (data: ProfileFormData) => Promise<void>;
  defaultValues?: Partial<ProfileFormData>;
}

export const useProfileForm = ({ onSubmit, defaultValues }: UseProfileFormProps) => {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  });

  return {
    form,
    onSubmit: handleSubmit,
  };
}; 