import { FaEnvelope } from 'react-icons/fa';
import { FormInput } from '../../../UI/Form/FormInput/FormInput.component';
import { FormWrapper } from '../../../UI/Form/FormWrapper/FormWrapper.component';
import { FormError } from '../../../UI/FormError/FormError.component';
import { FormLoadingButton } from '../../../UI/Loading/FormLoadingButton.component';
import { useForgotPasswordForm } from './useForgotPasswordForm';

const ForgotPasswordForm = () => {
  const { register, errors, loading, handleSubmit, errorMessage, successMessage } =
    useForgotPasswordForm();

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {errorMessage && <FormError message={errorMessage} withIcon variant="alert" title="Błąd resetowania hasła" />}
      
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          <p className="font-semibold mb-1">Email wysłany!</p>
          <p>{successMessage}</p>
        </div>
      )}

      {!successMessage && (
        <>
          <p className="text-gray-600 text-sm mb-6">
            Podaj swój adres email, a wyślemy Ci link do zresetowania hasła.
          </p>

          <FormInput
            type="email"
            label="Email"
            placeholder="twoj@email.com"
            icon={<FaEnvelope />}
            error={errors.email?.message}
            styles="white"
            {...register('email')}
          />

          <FormLoadingButton isLoading={loading} loadingText="Wysyłanie...">
            Wyślij link resetujący
          </FormLoadingButton>
        </>
      )}
    </FormWrapper>
  );
};

export default ForgotPasswordForm;
