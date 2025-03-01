import { AuthState } from '../types';

const API_URL = 'https://www.codelinesjs.pl/api/auth';

export const useForgotPasswordAction = (state: AuthState) => {
  const { setLoading, setError } = state;

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Wystąpił błąd podczas resetowania hasła');
      }
      
      return data.message;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return forgotPassword;
}; 