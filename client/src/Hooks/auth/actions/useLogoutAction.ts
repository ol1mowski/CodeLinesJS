import { useNavigate } from 'react-router-dom';

// Definiuję typ AuthState bezpośrednio tutaj, aby uniknąć cyklicznych importów
type AuthState = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useLogoutAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = state;

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    if (setUser) setUser(null);
    navigate('/logowanie');
  };

  return logout;
}; 