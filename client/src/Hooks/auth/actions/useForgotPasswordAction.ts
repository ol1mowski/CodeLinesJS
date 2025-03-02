import { API_URL } from '../../../config/api.config';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
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
      const response = await fetch(`${API_URL}auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      return data.message || 'Link do resetowania hasła został wysłany na Twój adres email.';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas wysyłania linku resetującego hasło');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return forgotPassword;
}; 