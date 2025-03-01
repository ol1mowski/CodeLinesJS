import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/useAuthActions";
import { useAuthCheck } from "./auth/useAuthCheck";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
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
  useAuthCheck(state);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/logowanie");
  };

  return {
    ...actions,
    ...state,
    logout,
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  };
};
