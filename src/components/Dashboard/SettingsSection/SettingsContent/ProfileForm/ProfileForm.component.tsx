import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfile } from "../../hooks/useProfile";
import { Avatar } from "../../components/Profile/Avatar/Avatar.component";
import { UserInfoFields } from "../../components/Profile/UserInfoFields/UserInfoFields.component";
import { BioField } from "../../components/Profile/BioField/BioField.component";
import { FormButtons } from "../../components/Profile/FormButtons/FormButtons.component";
import { styles } from "./style/ProfileForm.styles";
import { UserProfile } from "../../types/settings";
import { useToast } from "../../contexts/ToastContext";

export const ProfileForm = memo(() => {
  const { showToast } = useToast();
  const { profile, isLoading, updateProfile, updateAvatar, avatarUrl } = useProfile();
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  
  const handleSubmit = async (data: UserProfile) => {
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
  };

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
  
  const { register, formState: { errors, isSubmitting }, reset } = form;

  const handleChangeAvatar = useCallback(async (file: File) => {
    try {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
      const preview = URL.createObjectURL(file);
      setPreviewAvatar(preview);
      await updateAvatar.mutateAsync(file);
    } catch (error) {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
        setPreviewAvatar(null);
      }
      showToast('Nie udało się zaktualizować avatara', 'error');
    }
  }, [updateAvatar, previewAvatar, showToast]);

  const handleCancel = useCallback(() => {
    try {
      if (profile) {
        reset(profile);
        if (previewAvatar) {
          URL.revokeObjectURL(previewAvatar);
          setPreviewAvatar(null);
        }
        showToast('Zmiany zostały anulowane', 'success');
      }
    } catch (error) {
      showToast('Nie udało się anulować zmian', 'error');
    }
  }, [profile, reset, previewAvatar, showToast]);

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <Avatar
              src={avatarUrl || ''}
              alt="Avatar"
              onChangeAvatar={handleChangeAvatar}
              isUploading={updateAvatar.isPending}
              preview={previewAvatar}
              onReset={handleCancel}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-full md:h-auto 
                aspect-square rounded-full object-cover
                border-2 border-js/10 hover:border-js/30
                transition-colors duration-200"
            />
          </div>

          <div className={styles.infoSection}>
            <UserInfoFields
              register={register}
              errors={errors}
            />

           <BioField
              register={register}
              errors={errors}
              defaultValue={profile?.profile?.bio}
            />
          </div>
        </div>
      </div>

      <FormButtons 
        onCancel={handleCancel}
        isSubmitting={isSubmitting || updateProfile.isPending}
        submitText="Zapisz profil"
        loadingText="Zapisywanie"
      />
    </motion.form>
  );
});

ProfileForm.displayName = "ProfileForm"; 