import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../../../api/httpClient.api';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await httpClient.post('auth/login', { 
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
      
      if (setUser && user) {
        setUser(user);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Błąd logowania:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
}; 