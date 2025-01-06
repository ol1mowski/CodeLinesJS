import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';

const API_URL = 'http://localhost:5001/api/auth';

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('loginWithGoogle');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd logowania przez Google');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 