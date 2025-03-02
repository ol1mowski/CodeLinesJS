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
      console.log('Próba resetowania hasła do:', `${API_URL}auth/forgot-password`);
      
      const response = await fetch(`${API_URL}auth/forgot-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Dodajemy obsługę ciasteczek
        mode: 'cors', // Jawnie określamy tryb CORS
        body: JSON.stringify({ email }),
      });
      
      console.log('Odpowiedź serwera:', response.status, response.statusText);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Błąd parsowania JSON:', e);
        throw new Error('Nieprawidłowa odpowiedź serwera');
      }
      
      if (!response.ok) {
        console.error('Błąd resetowania hasła:', data);
        throw new Error(data.error || 'Nieznany błąd resetowania hasła');
      }
      
      console.log('Resetowanie hasła udane');
      
      return data.message || 'Link do resetowania hasła został wysłany na Twój adres email.';
    } catch (err) {
      console.error('Błąd podczas resetowania hasła:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas wysyłania linku resetującego hasło');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return forgotPassword;
}; 