import { useCallback } from 'react';
import { useProfileForm } from './useProfileForm';
import { useToast } from '../contexts/ToastContext';
import { UserProfile } from '../types/settings';

export const useProfileFormLogic = (profile: UserProfile | null, avatarUrl: string) => {
  const { showToast } = useToast();

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
  }, [avatarUrl, showToast]);

  const { form, onSubmit } = useProfileForm({
    onSubmit: handleSubmit,
    defaultValues: profile || {
      username: '',
      email: '',
      profile: {
        bio: '',
        avatar: ''
      }
    },
  });

  return {
    form,
    onSubmit
  };
}; 