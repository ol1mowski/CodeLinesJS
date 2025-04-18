import { useNavigate } from 'react-router-dom';

type AuthState = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any | null) => void;
};

export const useLogoutAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = state;
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return logout;
};
