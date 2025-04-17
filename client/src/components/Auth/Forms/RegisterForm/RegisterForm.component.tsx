import { FaEnvelope, FaUser } from 'react-icons/fa';
import { FormInput } from '../../../UI/Form/FormInput/FormInput.component';
import { FormWrapper } from '../../../UI/Form/FormWrapper/FormWrapper.component';
import { PasswordInput } from '../../../UI/Form/PasswordInput/PasswordInput.component';
import { PrivacyPolicyCheckbox } from './PrivacyPolicyCheckbox.component';
import { useRegisterForm } from './useRegisterForm';
import { FormError } from '../../../UI/FormError/FormError.component';
import { FormLoadingButton } from '../../../UI/Loading/FormLoadingButton.component';

const RegisterForm = () => {
  const { register, errors, loading, handleSubmit, errorMessage } = useRegisterForm();

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {errorMessage && (
        <FormError message={errorMessage} variant="alert" title="Błąd rejestracji" />
      )}

      <FormInput
        type="text"
        label="Nazwa użytkownika"
        placeholder="jankowalski"
        icon={<FaUser />}
        error={errors.username?.message}
        {...register('username')}
      />

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordInput label="Hasło" error={errors.password?.message} {...register('password')} />

      <PasswordInput
        label="Potwierdź hasło"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <PrivacyPolicyCheckbox
        register={register('acceptPrivacy')}
        error={errors.acceptPrivacy?.message}
      />

      <FormLoadingButton isLoading={loading} loadingText="Rejestracja...">
        Zarejestruj się
      </FormLoadingButton>
    </FormWrapper>
  );
};

export default RegisterForm;
