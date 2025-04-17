import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api.config";
import { useAuthState } from "./useAuthState.hook";
import { useAuthActions } from "../components/Auth/hooks/useAuthActions.hook";
import { AuthStateAndActions, AuthState } from "../types/auth.types";
import { User } from "../types/user.types";

export const useAuth = (): AuthStateAndActions => {
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
        throw new Error('Nieprawidłowa odpowiedź serwera' + e);
      }

      if (!response.ok) {
        throw new Error(data.error || "Nieznany błąd weryfikacji tokenu");
      }

      state.setUser(data.user as User);
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

  const authState: AuthState = {
    ...state,
    isAuthChecking,
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  };

  return {
    ...authState,
    ...actions,
    logout,
  };
};
