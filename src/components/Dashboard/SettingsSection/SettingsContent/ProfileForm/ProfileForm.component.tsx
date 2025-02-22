import { memo, useCallback, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useProfileFormLogic } from "../../hooks/useProfileFormLogic";
import { ProfileFormContent } from "./components/ProfileFormContent/ProfileFormContent.component";
import { useToast } from "../../contexts/ToastContext";
import { LoadingScreen } from "../../../../UI/LoadingScreen/LoadingScreen.component";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileForm = memo(() => {
  const { showToast } = useToast();
  const { profile, isLoading, updateProfile } = useProfile();
  const { form, onSubmit } = useProfileFormLogic(profile || null);
  const queryClient = useQueryClient();
  
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

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      showToast("Profil został zaktualizowany", "success");
    } catch (error) {
      showToast("Wystąpił błąd podczas aktualizacji profilu", "error");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProfileFormContent
      handleCancel={handleCancel}
      register={register}
      errors={errors}
      defaultBio={profile?.profile?.bio}
      isSubmitting={isSubmitting}
      isPending={updateProfile.isPending}
      onSubmit={handleSubmit}
    />
  );
});

ProfileForm.displayName = "ProfileForm"; 