import { useAuthState } from './auth/useAuthState';
import { useAuthActions } from './auth/useAuthActions';
import { useAuthCheck } from './auth/useAuthCheck';

export const useAuth = () => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  useAuthCheck(state);

  return {
    ...actions,
    ...state,
  };
}; 

