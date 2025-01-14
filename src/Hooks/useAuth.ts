import { useAuthState } from './auth/useAuthState';
import { useAuthActions } from './auth/useAuthActions';
import { useAuthCheck } from './auth/useAuthCheck';

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
}

export const useAuth = (): AuthState => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  useAuthCheck(state);

  return {
    ...actions,
    ...state,
    token: localStorage.getItem('token') || sessionStorage.getItem('token'),
  };
}; 

