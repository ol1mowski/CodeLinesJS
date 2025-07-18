import { memo } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { styles } from './BioField.styles';
import { UserProfile } from '../../../../types/settings.types';

type BioFieldProps = {
  register: UseFormRegister<UserProfile>;
  errors: FieldErrors<UserProfile>;
  defaultValue?: string;
};

export const BioField = memo(({ register, errors, defaultValue }: BioFieldProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Bio</label>
      <textarea
        {...register('profile.bio')}
        className={styles.textarea}
        placeholder={defaultValue || 'Napisz coś o sobie...'}
      />
      {errors.profile?.bio && <span className={styles.error}>{errors.profile.bio.message}</span>}
    </div>
  );
});

BioField.displayName = 'BioField';
