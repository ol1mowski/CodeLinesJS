import { useParams } from 'react-router-dom';
import { AuthSection } from '../AuthSection.component';
import { ResetPasswordForm } from '../Forms/ResetPasswordForm';

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <AuthSection
        title="Nieprawidłowy link"
        subtitle="Link do resetowania hasła jest nieprawidłowy lub wygasł."
      >
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          Nieprawidłowy lub wygasły token resetowania hasła. Spróbuj ponownie zresetować hasło.
        </div>
      </AuthSection>
    );
  }

  return (
    <AuthSection
      title="Resetowanie hasła"
      subtitle="Wprowadź nowe hasło dla swojego konta"
    >
      <ResetPasswordForm />
    </AuthSection>
  );
}; 