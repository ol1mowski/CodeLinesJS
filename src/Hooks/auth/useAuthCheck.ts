import { useEffect } from 'react';
import { useAuthState } from './useAuthState';

const API_URL = 'http://localhost:5001/api/auth';

export const useAuthCheck = (state: ReturnType<typeof useAuthState>) => {
  const { setIsAuthenticated, setUser, setIsLoading } = state;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/verify`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [setIsAuthenticated, setUser, setIsLoading]);
}; 