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
      const response = await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      sessionStorage.setItem('token', data.token);
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