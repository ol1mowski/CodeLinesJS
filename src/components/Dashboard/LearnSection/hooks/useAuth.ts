import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('token') || sessionStorage.getItem('token')
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { token, isAuthenticated: !!token };
}; 