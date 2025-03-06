import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../config/api.config';

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

      const apiUrl = API_URL.replace('www.', '');

      const response = await fetch(`${apiUrl}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email, password, username }),
      });

      if (response.status === 429) {
        throw new Error('Zbyt wiele prób rejestracji. Spróbuj ponownie za chwilę.');
      } else if (response.status === 409) {
        throw new Error('Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje.');
      } else if (response.status === 400) {
        throw new Error('Nieprawidłowe dane rejestracji. Sprawdź poprawność wprowadzonych danych.');
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
          throw new Error(data.error);
        } else if (data.message && typeof data.message === 'string') {
          throw new Error(data.message);
        } else if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().filter(Boolean);
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join('. '));
          }
        }
        
        throw new Error('Nieznany błąd rejestracji. Spróbuj ponownie później.');
      }

      sessionStorage.setItem('token', data.token);
      
      if (state.setUser && data.user) {
        state.setUser(data.user);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return register;
}; 