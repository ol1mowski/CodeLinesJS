import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UserProfile } from '../types/settings';

const profileSchema = z.object({
  username: z
    .string()
    .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki')
    .max(20, 'Nazwa użytkownika może mieć maksymalnie 20 znaków'),
  profile: z.object({
    bio: z.string().max(160, 'Bio może mieć maksymalnie 160 znaków').optional(),
    avatar: z.string().optional(),
  }),
});

interface UseProfileFormProps {
  onSubmit: (data: UserProfile) => Promise<void>;
  defaultValues?: Partial<UserProfile>;
}

export const useProfileForm = ({ onSubmit, defaultValues }: UseProfileFormProps) => {
  const form = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: defaultValues?.username || '',
      profile: {
        bio: defaultValues?.profile?.bio || '',
        avatar: defaultValues?.profile?.avatar || '',
      },
    },
  });

  const handleSubmit = async (data: UserProfile) => {
    await onSubmit(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
  };
};
