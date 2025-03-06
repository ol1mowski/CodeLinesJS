import { useLoginAction } from './actions/useLoginAction.hook';
import { useRegisterAction } from './actions/useRegisterAction.hook';
import { useForgotPasswordAction } from './actions/useForgotPasswordAction.hook';
import { useLogoutAction } from './actions/useLogoutAction.hook';
import { useGoogleLoginAction } from './actions/useGoogleLoginAction.hook';
import { useResetPasswordAction } from './actions/useResetPasswordAction.hook';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any | null) => void;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: any | null;
};

export const useAuthActions = (state: AuthState) => {
  const login = useLoginAction(state);
  const register = useRegisterAction(state);
  const forgotPassword = useForgotPasswordAction(state);
  const logout = useLogoutAction(state);
  const loginWithGoogle = useGoogleLoginAction(state);
  const resetPassword = useResetPasswordAction(state);

  return { login, register, forgotPassword, logout, loginWithGoogle, resetPassword };
}; 