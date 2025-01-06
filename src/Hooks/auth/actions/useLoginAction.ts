import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';

const API_URL = 'http://localhost:5001/api/auth';

export const useLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
      
      setIsAuthenticated(true);
      setUser(data.user);
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