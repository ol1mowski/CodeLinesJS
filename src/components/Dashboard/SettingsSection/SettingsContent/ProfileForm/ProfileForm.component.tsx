import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useProfileForm } from "../../hooks/useProfileForm";
import { Avatar } from "../../components/Profile/Avatar/Avatar.component";
import { UserInfoFields } from "../../components/Profile/UserInfoFields/UserInfoFields.component";
import { BioField } from "../../components/Profile/BioField/BioField.component";
import { FormButtons } from "../../components/Profile/FormButtons/FormButtons.component";
import { styles } from "./ProfileForm.styles";

const defaultValues = {
  username: "JanKowalski",
  email: "jan@example.com",
  bio: "Frontend Developer"
};

export const ProfileForm = memo(() => {
  const { form, onSubmit } = useProfileForm(defaultValues);
  const { register, formState: { errors, isSubmitting } } = form;

  const handleChangeAvatar = useCallback(() => {
    console.log("Change avatar");
  }, []);

  const handleCancel = useCallback(() => {
    console.log("Cancel");
  }, []);

  return (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.header}>
        <Avatar
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          onChangeAvatar={handleChangeAvatar}
        />
        <UserInfoFields
          register={register}
          errors={errors}
        />
      </div>

      <BioField
        register={register}
        errors={errors}
      />

      <FormButtons
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </motion.form>
  );
});

ProfileForm.displayName = "ProfileForm"; 