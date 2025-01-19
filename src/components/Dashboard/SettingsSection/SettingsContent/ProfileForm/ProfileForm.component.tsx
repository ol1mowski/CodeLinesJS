import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfile } from "../../hooks/useProfile";
import { Avatar } from "../../components/Profile/Avatar/Avatar.component";
import { UserInfoFields } from "../../components/Profile/UserInfoFields/UserInfoFields.component";
import { BioField } from "../../components/Profile/BioField/BioField.component";
import { FormButtons } from "../../components/Profile/FormButtons/FormButtons.component";
import { styles } from "./ProfileForm.styles";
import { Toast } from "../../UI/Toast/Toast.component";

export const ProfileForm = memo(() => {
  const { profile, isLoading, updateProfile, updateAvatar, avatarUrl } = useProfile();
  const [showToast, setShowToast] = useState(false);
  
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
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

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const handleChangeAvatar = useCallback(async (file: File) => {
    try {
      await updateAvatar.mutateAsync(file);
    } catch (error) {
      console.error('Failed to update avatar:', error);
    }
  }, [updateAvatar]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
      </div>
    );
  }

  return (
    <>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.header}>
          <Avatar
            src={avatarUrl || ''}
            alt="Avatar"
            onChangeAvatar={handleChangeAvatar}
            isUploading={updateAvatar.isPending}
          />
          <UserInfoFields
            register={register}
            errors={errors}
          />
        </div>

        <BioField
          register={register}
          errors={errors}
          defaultValue={profile?.profile?.bio}
        />

        <FormButtons
          saveDataHandler={form.handleSubmit(onSubmit)}
          isSubmitting={isSubmitting || updateProfile.isPending}
        />
      </motion.form>
    </>
  );
});

ProfileForm.displayName = "ProfileForm"; 