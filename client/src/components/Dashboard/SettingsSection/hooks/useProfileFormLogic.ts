import { useCallback } from 'react';
import { useProfileForm } from './useProfileForm';
import { UserProfile } from '../types/settings';
import { useProfile } from '../hooks/useProfile';
import { toast } from 'react-hot-toast';

export const useProfileFormLogic = (profile: UserProfile | null) => {
  const { updateProfile } = useProfile();

  const handleSubmit = useCallback(async (data: UserProfile) => {
    try {
      await updateProfile.mutateAsync({
        username: data.username,
        email: data.email,
        profile: {
          bio: data.profile?.bio || '',
        }
      });
      toast.success('Profil został zaktualizowany');
    } catch (error) {
      toast.error('Nie udało się zaktualizować profilu');
    }
  }, [updateProfile]);

  const defaultValues = {
    username: profile?.username || '',
    email: profile?.email || '',
    profile: {
      bio: profile?.profile?.bio || '',
    }
  };

  const { form, onSubmit } = useProfileForm({
    onSubmit: handleSubmit,
    defaultValues
  });

  return {
    form,
    onSubmit
  };
}; 