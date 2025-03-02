import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/api.config';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const loginWithGoogle = async (credentialResponse: any, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credential: credentialResponse.credential,
          rememberMe
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania przez Google');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 