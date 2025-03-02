import { useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { API_URL } from '../../config/api.config';
import { useAuth } from '../useAuth';

export const useAuthCheck = (state: ReturnType<typeof useAuthState>) => {
  const { setIsAuthenticated, setIsLoading } = state;
  const { token } = useAuth();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [setIsAuthenticated, setIsLoading]);
}; 