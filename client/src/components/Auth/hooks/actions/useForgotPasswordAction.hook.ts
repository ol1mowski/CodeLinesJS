import { API_URL } from '../../../../config/api.config';

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
      
      const apiUrl = API_URL.replace('www.', '');
      console.log('Próba resetowania hasła do:', `${apiUrl}auth/forgot-password`);
      
      const response = await fetch(`${apiUrl}auth/forgot-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email }),
      });
      
      console.log('Odpowiedź serwera:', response.status, response.statusText);
      
      if (response.status === 429) {
        throw new Error('Zbyt wiele prób resetowania hasła. Spróbuj ponownie za chwilę.');
      } else if (response.status === 404) {
        throw new Error('Nie znaleziono użytkownika o podanym adresie email.');
      }

      let data;
      try {
        const text = await response.text();
        if (!text) {
          throw new Error('Pusta odpowiedź serwera');
        }
        
        data = JSON.parse(text);
      } catch (e) {
        console.error('Błąd parsowania JSON:', e);
        throw new Error('Nieprawidłowa odpowiedź serwera');
      }
      
      if (!response.ok) {
        console.error('Błąd resetowania hasła:', data);
        
        if (data.message && typeof data.message === 'string') {
          throw new Error(data.message);
        } else if (data.error && typeof data.error === 'string') {
          throw new Error(data.error);
        } else {
          throw new Error('Nieznany błąd resetowania hasła');
        }
      }
      
      console.log('Resetowanie hasła udane');
      
      return data.message || 'Link do resetowania hasła został wysłany na Twój adres email.';
    } catch (err) {
      console.error('Błąd podczas resetowania hasła:', err);
      
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