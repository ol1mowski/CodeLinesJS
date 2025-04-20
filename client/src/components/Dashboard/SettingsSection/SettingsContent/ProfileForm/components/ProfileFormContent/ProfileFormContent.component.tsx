import { memo } from 'react';
import { motion } from 'framer-motion';
import { UserInfoFields } from '../UserInfoFields/UserInfoFields.component';
import { BioField } from '../BioField/BioField.component';
import { FormButtons } from '../FormButtons/FormButtons.component';
import { styles } from '../../style/ProfileForm.styles';

export type ProfileFormContentProps = {
  handleCancel: () => void;
  register: any;
  errors: any;
  defaultBio?: string;
  isSubmitting: boolean;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  isSaved?: boolean;
  isDirty?: boolean;
};

export const ProfileFormContent = memo(
  ({
    handleCancel,
    register,
    errors,
    defaultBio,
    isSubmitting,
    isPending,
    onSubmit,
    isSaved = false,
    isDirty = false,
  }: ProfileFormContentProps) => (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.infoSection}>
            <UserInfoFields register={register} errors={errors} />

            <BioField register={register} errors={errors} defaultValue={defaultBio} />
          </div>
          
          {isSaved && !isDirty && (
            <div className={styles.successMessage}>
              ✓ Zapisano zmiany
            </div>
          )}
        </div>
      </div>

      <FormButtons
        onCancel={handleCancel}
        isSubmitting={isSubmitting || isPending}
        submitText="Zapisz profil"
        loadingText="Zapisywanie"
        disabled={!isDirty || isSubmitting}
      />
    </motion.form>
  )
);

ProfileFormContent.displayName = 'ProfileFormContent';
