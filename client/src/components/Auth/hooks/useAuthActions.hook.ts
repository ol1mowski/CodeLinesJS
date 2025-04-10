import { useLoginAction } from './actions/useLoginAction.hook';
import { useRegisterAction } from './actions/useRegisterAction.hook';
import { useForgotPasswordAction } from './actions/useForgotPasswordAction.hook';
import { useLogoutAction } from './actions/useLogoutAction.hook';
import { useGoogleLoginAction } from './actions/useGoogleLoginAction.hook';
import { useResetPasswordAction } from './actions/useResetPasswordAction.hook';
import { AuthStateContext, AuthActions } from '../../../types/auth.types';

export const useAuthActions = (state: AuthStateContext): AuthActions => {
  const login = useLoginAction(state);
  const register = useRegisterAction(state);
  const forgotPassword = useForgotPasswordAction(state);
  const logout = useLogoutAction(state);
  const loginWithGoogle = useGoogleLoginAction(state);
  const resetPassword = useResetPasswordAction(state);

  return { login, register, forgotPassword, logout, loginWithGoogle, resetPassword };
}; 