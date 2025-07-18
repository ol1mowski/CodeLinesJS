import { useCallback } from 'react';
import { useProfileForm } from './useProfileForm.hook';
import { UserProfile } from '../types/settings';
import { useProfile } from './useProfile.hook';

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
      } catch (error) {
        console.error('Błąd w useProfileFormLogic:', error);
        throw error;
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
