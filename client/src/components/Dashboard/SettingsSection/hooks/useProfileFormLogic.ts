import { useCallback } from 'react';
import { useProfileForm } from './useProfileForm';
import { UserProfile } from '../types/settings';
import { useProfile } from '../hooks/useProfile';

export const useProfileFormLogic = (profile: UserProfile | null) => {
  const { updateProfile } = useProfile();

  const handleSubmit = useCallback(
    async (data: UserProfile) => {
      try {
        await updateProfile.mutateAsync({
          username: data.username,
          email: data.email,
          profile: {
            bio: data.profile?.bio || '',
          },
        });
        // Powiadomienia są obsługiwane w komponencie ProfileForm
      } catch (error) {
        // Błędy są obsługiwane w komponencie ProfileForm
        console.error('Błąd w useProfileFormLogic:', error);
        throw error; // Przekazujemy błąd dalej do obsługi w komponencie
      }
    },
    [updateProfile]
  );

  const defaultValues = {
    username: profile?.username || '',
    email: profile?.email || '',
    profile: {
      bio: profile?.profile?.bio || '',
    },
  };

  const { form, onSubmit } = useProfileForm({
    onSubmit: handleSubmit,
    defaultValues,
  });

  return {
    form,
    onSubmit,
  };
};
