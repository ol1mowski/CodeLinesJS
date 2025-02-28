import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';

export const useLogoutAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = state;

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/logowanie');
  };

  return logout;
}; 