import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api.config';
import { useAuthState } from './useAuthState.hook';
import { useAuthActions } from '../components/Auth/hooks/useAuthActions.hook';
import { AuthStateAndActions, AuthState, User } from '../components/Auth/types/auth.types';

export const useAuth = (): AuthStateAndActions => {
  const state = useAuthState();
  const actions = useAuthActions(state);
  const navigate = useNavigate();

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const checkAuth = async () => {
    try {
      setIsAuthChecking(true);
      
      const apiUrl = API_URL.replace('www.', '');

      const response = await fetch(`${apiUrl}auth/verify`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      });

      if (response.status === 429) {
        throw new Error('Zbyt wiele prób weryfikacji. Spróbuj ponownie za chwilę.');
      }

      let data;
      let responseText = '';
      try {
        responseText = await response.text();
        
        if (!responseText) {
          throw new Error('Pusta odpowiedź serwera');
        }

        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Nieprawidłowa odpowiedź serwera: ' + e);
      }

      if (data?.status === 'success' && data?.data) {
        state.setUser(data.data.user || data.data);
        state.setIsAuthenticated(true);
        return;
      }

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Nieznany błąd weryfikacji tokenu');
      }

      if (!data?.user) {
        throw new Error('Odpowiedź API nie zawiera danych użytkownika');
      }

      state.setUser(data.user as User);
      state.setIsAuthenticated(true);
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
      const apiUrl = API_URL.replace('www.', '');
      await fetch(`${apiUrl}auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
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
