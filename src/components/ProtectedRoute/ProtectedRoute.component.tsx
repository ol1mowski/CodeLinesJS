import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/logowanie" replace />;
  }

  return <>{children}</>;
}; 