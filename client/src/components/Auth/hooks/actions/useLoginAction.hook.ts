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
      
      const response = await fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email, password, rememberMe }),
      });
    
      
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
        } else {
          throw new Error('Nieznany błąd logowania. Spróbuj ponownie później.');
        }
      }
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      if (state.setUser && data.user) {
        state.setUser(data.user);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
}; 