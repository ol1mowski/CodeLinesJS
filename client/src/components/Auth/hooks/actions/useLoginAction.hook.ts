import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../../../api/httpClient.api';
import { AuthStateContext } from '../../../../types/auth.types';
import { User } from '../../../../types/user.types';

export const useLoginAction = (state: AuthStateContext) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;
  
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await httpClient.post<{ token: string; user: User }>('auth/login', { 
        email, 
        password, 
        rememberMe 
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('Nieznany błąd logowania. Spróbuj ponownie później.');
      }
      
      const { token, user } = response.data;
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      setUser(user);
      setIsAuthenticated(true);
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd logowania:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Wystąpił błąd podczas logowania';
      
      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
}; 