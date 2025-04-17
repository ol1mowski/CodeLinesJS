import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../../../api/httpClient.api';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useRegisterAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpClient.post('auth/register', {
        email,
        password,
        username,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('Nieznany błąd rejestracji. Spróbuj ponownie później.');
      }

      const { token, user } = response.data;

      sessionStorage.setItem('token', token);

      if (setUser && user) {
        setUser(user);
      }

      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd rejestracji:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return register;
};
