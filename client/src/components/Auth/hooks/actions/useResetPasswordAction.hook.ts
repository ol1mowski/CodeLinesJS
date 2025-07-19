import { httpClient } from "../../../../api/httpClient.api";
import { useNavigate } from 'react-router-dom';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useResetPasswordAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError } = state;

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<string> => {
    try {
      if (!token || token.length < 10) {
        throw new Error('Nieprawidłowy token resetowania hasła. Sprawdź, czy link jest poprawny.');
      }

      if (password !== confirmPassword) {
        throw new Error(
          'Hasła nie są identyczne. Upewnij się, że oba pola zawierają to samo hasło.'
        );
      }

      setLoading(true);
      setError(null);

      const response = await httpClient.post<{ message: string }>('auth/reset-password', {
        token,
        password,
        confirmPassword,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setTimeout(() => {
        navigate('/logowanie');
      }, 3000);

      return (
        response.data?.message ||
        'Hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany do strony logowania.'
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        const errorMessage = 'Wystąpił nieznany błąd podczas resetowania hasła';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return resetPassword;
};
