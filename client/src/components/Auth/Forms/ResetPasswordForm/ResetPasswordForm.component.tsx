import { Button } from '../../../UI/Button/Button.component';
import { FormWrapper } from '../../../UI/Form/FormWrapper/FormWrapper.component';
import { ErrorAlert } from '../../../UI/Alerts/ErrorAlert.component';
import { PasswordInput } from '../../../UI/Form/PasswordInput/PasswordInput.component';
import { TokenErrorMessage } from './TokenErrorMessage.component';
import { SuccessMessage } from './SuccessMessage.component';
import { useResetPasswordForm } from './useResetPasswordForm';

const ResetPasswordForm = () => {
  const { register, errors, loading, handleSubmit, errorMessage, successMessage, tokenError } =
    useResetPasswordForm();

  if (tokenError) {
    return <TokenErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {errorMessage && <ErrorAlert message={errorMessage} title="Błąd resetowania hasła" />}
      <SuccessMessage message={successMessage} />

      {!successMessage && (
        <>
          <p className="text-gray-400 text-sm mb-6">
            Wprowadź nowe hasło dla swojego konta. Hasło musi zawierać co najmniej 8 znaków, w tym
            jedną wielką literę, jedną małą literę i jedną cyfrę.
          </p>

          <PasswordInput
            label="Nowe hasło"
            error={errors.password?.message}
            styles="white"
            {...register('password')}
          />

          <PasswordInput
            label="Potwierdź nowe hasło"
            error={errors.confirmPassword?.message}
            styles="white"
            {...register('confirmPassword')}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetowanie hasła...' : 'Zresetuj hasło'}
          </Button>
        </>
      )}
    </FormWrapper>
  );
};

export default ResetPasswordForm;
