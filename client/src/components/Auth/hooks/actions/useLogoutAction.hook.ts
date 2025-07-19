import { httpClient } from "../../../../api/httpClient.api";
import { useNavigate } from 'react-router-dom';
import { AuthStateContext } from '../../types/auth.types';

export const useLogoutAction = (state: AuthStateContext) => {
  const navigate = useNavigate();
  const { setLoading, setIsAuthenticated, setUser } = state;

  const logout = async () => {
    try {
      setLoading(true);
      
      await httpClient.post('auth/logout', {});
      
      if (setUser) {
        setUser(null);
      }
      
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas wylogowania:', error);
      if (setUser) {
        setUser(null);
      }
      setIsAuthenticated(false);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return logout;
};
