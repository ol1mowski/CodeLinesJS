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
          const response = await fetch(`${API_URL}auth/verify`, {
            headers: {
              Authorization: `Bearer ${tokenLocalStorage || tokenSessionStorage}`
            }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }
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
