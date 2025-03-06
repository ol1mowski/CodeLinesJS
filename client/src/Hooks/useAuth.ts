import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api.config";
import { useAuthState } from "../hooks/useAuthState.hook";
import { useAuthActions } from "../components/Auth/hooks/useAuthActions.hook";

type User = {
  id: string;
  _id: string;
  email: string;
  username: string;
};

type AuthState = {
  isAuthenticated: boolean;
  isAuthChecking: boolean;
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
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<string>;
};

export const useAuth = (): AuthState => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  const navigate = useNavigate();

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const checkAuth = async () => {
    try {
      setIsAuthChecking(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        state.setIsAuthenticated(false);
        return;
      }

      const apiUrl = API_URL.replace('www.', '');

      const response = await fetch(`${apiUrl}auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
        mode: 'cors'
      });

      if (response.status === 429) {  
        throw new Error('Zbyt wiele prób weryfikacji. Spróbuj ponownie za chwilę.');
      }

      let data;
      try {
        const text = await response.text();
        if (!text) {
          throw new Error('Pusta odpowiedź serwera');
        }
        
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Nieprawidłowa odpowiedź serwera');
      }

      if (!response.ok) {
        throw new Error(data.error || "Nieznany błąd weryfikacji tokenu");
      }

      state.setUser(data.user);
      state.setIsAuthenticated(true);
    } catch (err) {
      state.setError(err instanceof Error ? err.message : "Wystąpił błąd podczas weryfikacji tokenu");
      state.setIsAuthenticated(false);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    } finally {
      setIsAuthChecking(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    state.setIsAuthenticated(false);
    state.setUser(null);
    navigate("/");
  };

  return {
    ...state,
    isAuthChecking,
    logout,
    login: actions.login,
    register: actions.register,
    loginWithGoogle: actions.loginWithGoogle,
    forgotPassword: actions.forgotPassword,
    resetPassword: actions.resetPassword,
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  };
};
