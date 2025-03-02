import { useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { API_URL } from '../../config/api.config';

export const useAuthCheck = (state: ReturnType<typeof useAuthState>) => {
  const { setIsAuthenticated, setIsLoading } = state;

  useEffect(() => {
    const checkAuth = async () => {
      const tokenLocalStorage = localStorage.getItem('token');
      const tokenSessionStorage = sessionStorage.getItem('token');
      if (tokenLocalStorage || tokenSessionStorage) {
        try {
          const response = await fetch(`${API_URL}auth/verify`, {
            headers: {
              Authorization: `Bearer ${tokenLocalStorage || tokenSessionStorage}`
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