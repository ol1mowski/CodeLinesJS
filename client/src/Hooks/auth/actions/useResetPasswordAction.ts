import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/api.config';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useResetPasswordAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError } = state;

  const resetPassword = async (token: string, password: string): Promise<string> => {
    try {
      if (!token || token.length < 10) {
        throw new Error('Nieprawidłowy token resetowania hasła. Sprawdź, czy link jest poprawny.');
      }

      setLoading(true);
      setError(null);
      
      const apiUrl = API_URL.replace('www.', '');
      
      const response = await fetch(`${apiUrl}auth/reset-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ token, password }),
      });
      
      
      if (response.status === 429) {
        throw new Error('Zbyt wiele prób resetowania hasła. Spróbuj ponownie za chwilę.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Token resetowania hasła wygasł lub jest nieprawidłowy. Spróbuj ponownie zresetować hasło.');
      } else if (response.status === 404) {
        throw new Error('Nie znaleziono użytkownika powiązanego z tym tokenem. Sprawdź, czy link jest poprawny.');
      } else if (response.status >= 500) {
        throw new Error('Wystąpił błąd serwera. Spróbuj ponownie później.');
      }
      
      let data;
      try {
        const text = await response.text();
        if (!text) {
          throw new Error('Pusta odpowiedź serwera');
        }
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Nieprawidłowa odpowiedź serwera. Spróbuj ponownie później.');
      }
      
      if (!response.ok) {
        
        if (data.error && typeof data.error === 'string') {
          if (data.error.includes('token')) {
            throw new Error('Token resetowania hasła wygasł lub jest nieprawidłowy. Spróbuj ponownie zresetować hasło.');
          } else if (data.error.includes('hasło')) {
            throw new Error(data.error || 'Hasło nie spełnia wymagań bezpieczeństwa.');
          } else {
            throw new Error(data.error);
          }
        } else {
          throw new Error('Nieznany błąd resetowania hasła. Spróbuj ponownie później.');
        }
      }
    
      
      setTimeout(() => {
        navigate('/logowanie');
      }, 3000);
      
      return data.message || 'Hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany do strony logowania.';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas resetowania hasła');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return resetPassword;
}; 