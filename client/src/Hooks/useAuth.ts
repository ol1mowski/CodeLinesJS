import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/useAuthActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api.config";

type User = {
  id: string;
  _id: string;
  email: string;
  username: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  register: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: (credentialResponse: any, rememberMe?: boolean) => Promise<void>;
};

export const useAuth = (): AuthState => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoading } = state;
  
  // Przeniesiona logika z useAuthCheck bezpośrednio do useAuth
  useEffect(() => {
    const checkAuth = async () => {
      const tokenLocalStorage = localStorage.getItem('token');
      const tokenSessionStorage = sessionStorage.getItem('token');
      if (tokenLocalStorage || tokenSessionStorage) {
        try {
          // Usuwam www. z adresu API, ponieważ może to powodować problemy z CORS
          const apiUrl = API_URL.replace('www.', '');
          console.log('Sprawdzanie tokenu:', `${apiUrl}auth/verify`);
          
          const response = await fetch(`${apiUrl}auth/verify`, {
            headers: {
              'Authorization': `Bearer ${tokenLocalStorage || tokenSessionStorage}`,
              'Accept': 'application/json'
            },
            // Usuwam credentials: 'include', ponieważ powoduje to problemy z CORS
            mode: 'cors' // Jawnie określamy tryb CORS
          });
          
          console.log('Odpowiedź weryfikacji:', response.status, response.statusText);
          
          if (response.ok) {
            console.log('Token zweryfikowany pomyślnie');
            setIsAuthenticated(true);
          } else {
            console.warn('Weryfikacja tokenu nieudana, usuwanie tokenu');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Błąd podczas weryfikacji tokenu:', error);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        console.log('Brak tokenu do weryfikacji');
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [setIsAuthenticated, setIsLoading]);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/logowanie");
  };

  return {
    ...actions,
    ...state,
    logout,
    token: localStorage.getItem("token") || sessionStorage.getItem("token")
  };
};
