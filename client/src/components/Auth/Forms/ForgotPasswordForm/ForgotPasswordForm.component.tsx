import { FaEnvelope } from 'react-icons/fa';
import { FormInput } from '../../../UI/Form/FormInput/FormInput.component';
import { Button } from '../../../UI/Button/Button.component';
import { FormWrapper } from '../../../UI/Form/FormWrapper/FormWrapper.component';
import { ErrorAlert } from '../../../UI/Alerts/ErrorAlert.component';
import { SuccessAlert } from '../../../UI/Alerts/SuccessAlert.component';
import { useForgotPasswordForm } from './useForgotPasswordForm';

const ForgotPasswordForm = () => {
  const { register, errors, loading, handleSubmit, errorMessage, successMessage } =
    useForgotPasswordForm();

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {errorMessage && <ErrorAlert message={errorMessage} title="Błąd resetowania hasła" />}
      {successMessage && <SuccessAlert message={successMessage} />}

      {!successMessage && (
        <>
          <p className="text-gray-400 text-sm mb-6">
            Podaj swój adres email, a wyślemy Ci link do zresetowania hasła.
          </p>

          <FormInput
            type="email"
            label="Email"
            placeholder="twoj@email.com"
            icon={<FaEnvelope />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Wysyłanie...' : 'Wyślij link resetujący'}
          </Button>
        </>
      )}
    </FormWrapper>
  );
};

export default ForgotPasswordForm;
