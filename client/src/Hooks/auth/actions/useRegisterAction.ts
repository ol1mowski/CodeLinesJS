import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';
import { API_URL } from '../../../config/api.config';

export const useRegisterAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      
      const userResponse = await fetch(`${API_URL}auth/verify`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return register;
}; 