import { memo, useCallback } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Loader } from "../../components/UI/Loader/Loader.component";
import { useProfileFormLogic } from "../../hooks/useProfileFormLogic";
import { useAvatarHandling } from "../../hooks/useAvatarHandling";
import { ProfileFormContent } from "./components/ProfileFormContent/ProfileFormContent.component";
import { useToast } from "../../contexts/ToastContext";

export const ProfileForm = memo(() => {
  const { showToast } = useToast();
  const { profile, isLoading, updateProfile, updateAvatar, avatarUrl } = useProfile();
  const { previewAvatar, handleChangeAvatar } = useAvatarHandling(updateAvatar);
  const { form, onSubmit } = useProfileFormLogic(profile || null, avatarUrl);
  
  const { register, formState: { errors, isSubmitting }, reset } = form;

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
      avatarUrl={avatarUrl}
      previewAvatar={previewAvatar}
      handleChangeAvatar={handleChangeAvatar}
      handleCancel={handleCancel}
      isUploading={updateAvatar.isPending}
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