import { useEffect } from 'react';
import { useAuthState } from './useAuthState';

const API_URL = 'http://localhost:5001/api/auth';

export const useAuthCheck = (state: ReturnType<typeof useAuthState>) => {
  const { setIsAuthenticated, setUser, setIsLoading } = state;

  useEffect(() => {
    const checkAuth = async () => {
      const tokenLocalStorage = localStorage.getItem('token');
      const tokenSessionStorage = sessionStorage.getItem('token');
      if (tokenLocalStorage || tokenSessionStorage) {
        try {
          const response = await fetch(`${API_URL}/verify`, {
            headers: {
              Authorization: `Bearer ${tokenLocalStorage || tokenSessionStorage}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
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
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [setIsAuthenticated, setUser, setIsLoading]);
}; 