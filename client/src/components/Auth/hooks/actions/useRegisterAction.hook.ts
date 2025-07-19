import { useNavigate } from 'react-router-dom';
import { AuthStateContext, User } from '../../types/auth.types';
import { httpClient } from '../../../../api/httpClient.api';

export const useRegisterAction = (state: AuthStateContext) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpClient.post<{ user: User }>('auth/register', {
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

      const { user } = response.data;

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
