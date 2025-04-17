import { useEffect } from 'react';
import { useAuthState } from './useAuthState.hook';
import { useAuth } from './useAuth';
import { httpClient } from '../api/httpClient.api';

export const useAuthCheck = (state: ReturnType<typeof useAuthState>) => {
  const { setIsAuthenticated, setIsLoading, setUser } = state;
  const { token } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await httpClient.get('auth/verify', {
            requiresAuth: true,
          });

          if (response.data && !response.error) {
            setIsAuthenticated(true);
            if (response.data.user) {
              setUser(response.data.user);
            }
          } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token, setIsAuthenticated, setIsLoading, setUser]);
};
