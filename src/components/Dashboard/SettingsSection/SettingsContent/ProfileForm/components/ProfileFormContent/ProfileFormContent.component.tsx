import { memo } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../Avatar/Avatar.component';
import { UserInfoFields } from '../UserInfoFields/UserInfoFields.component';
import { BioField } from '../BioField/BioField.component';
import { FormButtons } from '../FormButtons/FormButtons.component';
import { styles } from '../../style/ProfileForm.styles';

type ProfileFormContentProps = {
  avatarUrl: string;
  previewAvatar: string | null;
  handleChangeAvatar: (file: File) => Promise<void>;
  handleCancel: () => void;
  isUploading: boolean;
  register: any;
  errors: any;
  defaultBio?: string;
  isSubmitting: boolean;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export const ProfileFormContent = memo(({
  avatarUrl,
  previewAvatar,
  handleChangeAvatar,
  handleCancel,
  isUploading,
  register,
  errors,
  defaultBio,
  isSubmitting,
  isPending,
  onSubmit
}: ProfileFormContentProps) => (
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
            isUploading={isUploading}
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
            defaultValue={defaultBio}
          />
        </div>
      </div>
    </div>

    <FormButtons 
      onCancel={handleCancel}
      isSubmitting={isSubmitting || isPending}
      submitText="Zapisz profil"
      loadingText="Zapisywanie"
    />
  </motion.form>
)); 