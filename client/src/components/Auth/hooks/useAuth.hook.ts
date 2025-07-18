import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from './useAuthState.hook';
import { useAuthActions } from './useAuthActions.hook';
import { useApi } from '../../../api/hooks/useApi.hook';
import { AuthStateAndActions, AuthState, User } from '../types/auth.types';

export const useAuth = (): AuthStateAndActions => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  const navigate = useNavigate();
  const api = useApi<{ user: User }>();

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const checkAuth = async () => {
    try {
      setIsAuthChecking(true);
      
      const response = await api.get('auth/verify');
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.user) {
        state.setUser(response.data.user);
        state.setIsAuthenticated(true);
      } else {
        throw new Error('Odpowiedź API nie zawiera danych użytkownika');
      }
    } catch (err) {
      state.setError(
        err instanceof Error ? err.message : 'Wystąpił błąd podczas weryfikacji tokenu'
      );
      state.setIsAuthenticated(false);
    } finally {
      setIsAuthChecking(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post('auth/logout', {});
    } catch (error) {
      console.error('Błąd podczas wylogowania:', error);
    } finally {
      state.setIsAuthenticated(false);
      state.setUser(null);
      navigate('/');
    }
  };

  const authState: AuthState = {
    ...state,
    isAuthChecking,
    token: null,
  };

  return {
    ...authState,
    ...actions,
    logout,
  };
}; 