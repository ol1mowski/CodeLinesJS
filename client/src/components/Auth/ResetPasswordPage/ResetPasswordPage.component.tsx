import { useParams } from 'react-router-dom';
import { AuthSection } from '../AuthSection.component';
import { ResetPasswordForm } from '../Forms/ResetPasswordForm';
import { InvalidTokenMessage } from './InvalidTokenMessage.component';

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <AuthSection
        title="Nieprawidłowy link"
        subtitle="Link do resetowania hasła jest nieprawidłowy lub wygasł."
      >
        <InvalidTokenMessage />
      </AuthSection>
    );
  }

  return (
    <AuthSection title="Resetowanie hasła" subtitle="Wprowadź nowe hasło dla swojego konta">
      <ResetPasswordForm />
    </AuthSection>
  );
};
