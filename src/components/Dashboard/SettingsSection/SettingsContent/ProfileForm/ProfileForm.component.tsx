import { memo, useCallback, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Loader } from "../../components/UI/Loader/Loader.component";
import { useProfileFormLogic } from "../../hooks/useProfileFormLogic";
import { ProfileFormContent } from "./components/ProfileFormContent/ProfileFormContent.component";
import { useToast } from "../../contexts/ToastContext";

export const ProfileForm = memo(() => {
  const { showToast } = useToast();
  const { profile, isLoading, updateProfile } = useProfile();
  const { form, onSubmit } = useProfileFormLogic(profile || null);
  
  const { register, formState: { errors, isSubmitting }, reset, setValue } = form;

  useEffect(() => {
    if (profile) {
      setValue('username', profile.username);
      setValue('email', profile.email);
      setValue('profile.bio', profile.profile?.bio || '');
    }
  }, [profile, setValue]);

  const handleCancel = useCallback(() => {
    try {
      if (profile) {
        reset(profile);
        showToast('Zmiany zostały anulowane', 'success');
      }
    } catch (error) {
      showToast('Nie udało się anulować zmian', 'error');
    }
  }, [profile, reset, showToast]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ProfileFormContent
      handleCancel={handleCancel}
      register={register}
      errors={errors}
      defaultBio={profile?.profile?.bio}
      isSubmitting={isSubmitting}
      isPending={updateProfile.isPending}
      onSubmit={onSubmit}
    />
  );
});

ProfileForm.displayName = "ProfileForm"; 