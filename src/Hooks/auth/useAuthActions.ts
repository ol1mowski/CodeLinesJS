import { useLoginAction } from './actions/useLoginAction';
import { useRegisterAction } from './actions/useRegisterAction';
import { useForgotPasswordAction } from './actions/useForgotPasswordAction';
import { useLogoutAction } from './actions/useLogoutAction';
import { useGoogleLoginAction } from './actions/useGoogleLoginAction';
import { AuthState } from './types';

export const useAuthActions = (state: AuthState) => {
  const login = useLoginAction(state);
  const register = useRegisterAction(state);
  const forgotPassword = useForgotPasswordAction(state);
  const logout = useLogoutAction(state);
  const loginWithGoogle = useGoogleLoginAction(state);

  return { login, register, forgotPassword, logout, loginWithGoogle };
}; 