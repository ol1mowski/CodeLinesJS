import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/api.config';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useResetPasswordAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError } = state;

  const resetPassword = async (token: string, password: string): Promise<string> => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = API_URL.replace('www.', '');
      console.log('Próba resetowania hasła do:', `${apiUrl}auth/reset-password`);
      
      const response = await fetch(`${apiUrl}auth/reset-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ token, password }),
      });
      
      console.log('Odpowiedź serwera:', response.status, response.statusText);
      
      // Obsługa błędu 429 (Too Many Requests)
      if (response.status === 429) {
        const errorText = await response.text();
        console.error('Zbyt wiele żądań:', errorText);
        throw new Error('Zbyt wiele prób resetowania hasła. Spróbuj ponownie za chwilę.');
      }
      
      let data;
      try {
        // Sprawdzamy, czy odpowiedź jest pusta
        const text = await response.text();
        if (!text) {
          throw new Error('Pusta odpowiedź serwera');
        }
        
        // Próbujemy sparsować JSON
        data = JSON.parse(text);
      } catch (e) {
        console.error('Błąd parsowania JSON:', e);
        throw new Error('Nieprawidłowa odpowiedź serwera. Spróbuj ponownie później.');
      }
      
      if (!response.ok) {
        console.error('Błąd resetowania hasła:', data);
        throw new Error(data.error || 'Nieznany błąd resetowania hasła');
      }
      
      console.log('Resetowanie hasła udane');
      
      // Po udanym zresetowaniu hasła przekierowujemy do strony logowania
      setTimeout(() => {
        navigate('/logowanie');
      }, 3000);
      
      return data.message || 'Hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany do strony logowania.';
    } catch (err) {
      console.error('Błąd podczas resetowania hasła:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas resetowania hasła');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return resetPassword;
}; 