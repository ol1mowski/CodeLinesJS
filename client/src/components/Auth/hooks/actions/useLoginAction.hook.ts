import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../config/api.config';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = API_URL.replace('www.', '');
      console.log('Próba logowania do:', `${apiUrl}auth/login`);
      
      const response = await fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email, password, rememberMe }),
      });
      
      console.log('Odpowiedź serwera:', response.status, response.statusText);
      
      if (response.status === 429) {
        const errorText = await response.text();
        console.error('Zbyt wiele żądań:', errorText);
        throw new Error('Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.');
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
        throw new Error('Nieprawidłowa odpowiedź serwera. Spróbuj ponownie później.');
      }
      
      if (!response.ok) {
        console.error('Błąd logowania:', data);
        throw new Error(data.error || 'Nieznany błąd logowania');
      }
      
      console.log('Logowanie udane, token:', data.token ? 'otrzymany' : 'brak');
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd podczas logowania:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
}; 