import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/api.config';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useRegisterAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Próba rejestracji do:', `${API_URL}auth/register`);
      
      const response = await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Dodajemy obsługę ciasteczek
        mode: 'cors', // Jawnie określamy tryb CORS
        body: JSON.stringify({ email, password, username }),
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
        console.error('Błąd rejestracji:', data);
        throw new Error(data.error || 'Nieznany błąd rejestracji');
      }
      
      console.log('Rejestracja udana, token:', data.token ? 'otrzymany' : 'brak');
      
      sessionStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd podczas rejestracji:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return register;
}; 