import { useNavigate } from 'react-router-dom';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useLogoutAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setIsAuthenticated, setUser } = state;

  const logout = () => {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      
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
