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
        if (response.error.includes("już istnieje")) {
          setError("Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje w systemie");
          throw new Error("Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje w systemie");
        }
        setError(response.error);
        throw new Error(response.error);
      }

      if (!response.data) {
        const errorMsg = 'Nieznany błąd rejestracji. Spróbuj ponownie później.';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      const { token, user } = response.data;

      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      sessionStorage.setItem('token', token);

      if (setUser && user) {
        setUser(user);
      }

      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji';
      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return register;
};
