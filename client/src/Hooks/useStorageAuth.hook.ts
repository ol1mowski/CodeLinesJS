import { useState, useEffect, useCallback } from 'react';
import { getAuthToken, saveAuthToken, removeAuthToken } from '../utils/storage';

type User = {
  id: string;
  _id: string;
  email: string;
  username: string;
};

type UseStorageAuthReturn = {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  saveToken: (token: string, persistent?: boolean) => void;
  removeToken: () => void;
  saveUser: (user: User) => void;
  removeUser: () => void;
};

export const useStorageAuth = (): UseStorageAuthReturn => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<User | null>(() => {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(getAuthToken());

      const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
      setUser(userString ? JSON.parse(userString) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToken = useCallback((newToken: string, persistent: boolean = true) => {
    saveAuthToken(newToken, persistent);
    setToken(newToken);
  }, []);

  const removeToken = useCallback(() => {
    removeAuthToken();
    setToken(null);
  }, []);

  const saveUser = useCallback((userData: User) => {
    try {
      const userJson = JSON.stringify(userData);
      localStorage.setItem('user', userJson);
      setUser(userData);
    } catch (e) {
      console.error('Błąd zapisywania użytkownika:', e);
    }
  }, []);

  const removeUser = useCallback(() => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    user,
    saveToken,
    removeToken,
    saveUser,
    removeUser,
  };
};
