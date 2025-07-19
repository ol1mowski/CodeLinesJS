import { httpClient } from "../../../../api/httpClient.api";
import { useNavigate } from 'react-router-dom';
import { AuthStateContext, User } from '../../types/auth.types';

export const useLoginAction = (state: AuthStateContext) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpClient.post<{ user: User }>('auth/login', {
        email,
        password,
        rememberMe,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('Nieznany błąd logowania. Spróbuj ponownie później.');
      }

      const { user } = response.data;

      setUser(user);
      setIsAuthenticated(true);

      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania';
      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
};
