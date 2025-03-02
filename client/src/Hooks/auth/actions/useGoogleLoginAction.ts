import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/api.config';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const loginWithGoogle = async (credentialResponse: any, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Próba logowania przez Google do:', `${API_URL}auth/google`);
      
      const response = await fetch(`${API_URL}auth/google`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Dodajemy obsługę ciasteczek
        mode: 'cors', // Jawnie określamy tryb CORS
        body: JSON.stringify({ 
          credential: credentialResponse.credential,
          rememberMe
        }),
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
        console.error('Błąd logowania przez Google:', data);
        throw new Error(data.error || 'Nieznany błąd logowania przez Google');
      }
      
      console.log('Logowanie przez Google udane, token:', data.token ? 'otrzymany' : 'brak');
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd podczas logowania przez Google:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania przez Google');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 