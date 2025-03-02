import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';
import { API_URL } from '../../../config/api.config';

export const useLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
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
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return login;
}; 