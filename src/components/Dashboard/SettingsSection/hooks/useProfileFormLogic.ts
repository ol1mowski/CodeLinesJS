import { useCallback } from 'react';
import { useProfileForm } from './useProfileForm';
import { useToast } from '../contexts/ToastContext';
import { UserProfile } from '../types/settings';
import { useProfile } from '../hooks/useProfile';

export const useProfileFormLogic = (profile: UserProfile | null, avatarUrl: string) => {
  const { showToast } = useToast();
  const { updateProfile } = useProfile();

  const handleSubmit = useCallback(async (data: UserProfile) => {
    try {
      await updateProfile.mutateAsync({
        username: data.username,
        email: data.email,
        profile: {
          bio: data.profile?.bio || '',
          avatar: avatarUrl || ''
        }
      });
      showToast('Profil został zaktualizowany', 'success');
    } catch (error) {
      showToast('Nie udało się zaktualizować profilu', 'error');
    }
  }, [avatarUrl, showToast, updateProfile]);

  const defaultValues = {
    username: profile?.username || '',
    email: profile?.email || '',
    profile: {
      bio: profile?.profile?.bio || '',
      avatar: profile?.profile?.avatar || ''
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