import { memo } from 'react';
import { FaUser } from 'react-icons/fa';
import { FormInput } from '../../../../../../UI/Form/FormInput/FormInput.component';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { UserProfile } from '../../../../types/settings.types';
import { styles } from '../../style/ProfileForm.styles';

type UserInfoFieldsProps = {
  register: UseFormRegister<UserProfile>;
  errors: FieldErrors<UserProfile>;
};

export const UserInfoFields = memo(({ register, errors }: UserInfoFieldsProps) => (
  <>
    <div className={styles.usernameContainer}>
      <FormInput
        type="text"
        label="Nazwa użytkownika"
        placeholder="Wprowadź nazwę użytkownika"
        icon={<FaUser />}
        error={errors.username?.message}
        {...register('username')}
      />
    </div>
  </>
));

UserInfoFields.displayName = 'UserInfoFields';
