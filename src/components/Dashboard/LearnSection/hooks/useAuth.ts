import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('token') || sessionStorage.getItem('token')
  );

  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

  const userId = user["id"];

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { token, isAuthenticated: !!token, userId };
}; 