import { Component, ReactNode } from 'react';
import { AuthErrorFallback } from './AuthErrorFallback.component';

type AuthErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type AuthErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  public state: AuthErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Błąd w komponencie Auth:', error);
    console.error('Szczegóły błędu:', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <AuthErrorFallback />;
    }

    return this.props.children;
  }
}
