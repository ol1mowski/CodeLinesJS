import { httpClient } from "../../../../api/httpClient.api";

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useForgotPasswordAction = (state: AuthState) => {
  const { setLoading, setError } = state;

  const forgotPassword = async (email: string): Promise<string> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpClient.post<{ message: string }>('auth/forgot-password', {
        email,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      return (
        response.data?.message || 'Link do resetowania hasła został wysłany na Twój adres email.'
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        const errorMessage = 'Wystąpił błąd podczas wysyłania linku resetującego hasło';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return forgotPassword;
};
