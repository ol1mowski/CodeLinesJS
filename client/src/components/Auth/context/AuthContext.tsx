import { createContext, useContext, ReactNode } from 'react';
import { AuthStateAndActions } from '../../../types/auth.types';

const defaultAuthContext: AuthStateAndActions = {
  isAuthenticated: false,
  isAuthChecking: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  logout: () => {},
  login: async () => {},
  register: async () => {},
  loginWithGoogle: async () => {},
  forgotPassword: async () => '',
  resetPassword: async () => '',
};

export const AuthContext = createContext<AuthStateAndActions>(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
  value: AuthStateAndActions;
};

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthContext musi być używany wewnątrz AuthProvider');
  }
  
  return context;
}; 