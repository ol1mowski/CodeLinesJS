import { memo, useCallback, useEffect, useState } from 'react';
import { useProfile } from '../../hooks/useProfile.hook';
import { useProfileFormLogic } from '../../hooks/useProfileFormLogic.hook';
import { ProfileFormContent } from './components/ProfileFormContent/ProfileFormContent.component';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { PROFILE_QUERY_KEY } from '../../hooks/useProfile.hook';

export const ProfileForm = memo(() => {
  const { profile, username, bio, isLoading, updateProfile } = useProfile();
  const { form, onSubmit } = useProfileFormLogic(profile || null);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = form;
    
  const watchedValues = watch();

  useEffect(() => {
    if (isDirty) {
      setIsSaved(false);
    }
  }, [watchedValues, isDirty]);

  useEffect(() => {
    if (profile) {
      setValue('username', username);
      setValue('profile.bio', bio);
    }
  }, [profile, setValue, username, bio]);

  const handleCancel = useCallback(() => {
    try {
      if (profile) {
        reset(profile);
        toast.success('Zmiany zostały anulowane');
        setIsSaved(false);
      }
    } catch (error) {
      toast.error('Nie udało się anulować zmian');
    }
  }, [profile, reset]);

  const handleSubmit = async (data: any) => {
    if (!isDirty) {
      toast.success('Nie wprowadzono żadnych zmian');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      setIsSaved(true);
      toast.success('Profil został zaktualizowany pomyślnie');
    } catch (error) {
      setIsSaved(false);
      if (error instanceof Error) {
        toast.error(error.message || 'Wystąpił błąd podczas aktualizacji profilu');
      } else {
        toast.error('Wystąpił nieznany błąd podczas aktualizacji profilu');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      {isSaved && !isDirty && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg mb-4 flex items-center">
          <span className="mr-2">✓</span>
          Twój profil został zaktualizowany pomyślnie
        </div>
      )}
      
      <ProfileFormContent
        handleCancel={handleCancel}
        register={register}
        errors={errors}
        defaultBio={bio}
        isSubmitting={isSubmitting || updateProfile.isPending}
        isPending={updateProfile.isPending}
        onSubmit={handleSubmit}
        isSaved={isSaved}
        isDirty={isDirty}
        isLoading={isLoading}
      />
    </>
  );
});

ProfileForm.displayName = 'ProfileForm';
