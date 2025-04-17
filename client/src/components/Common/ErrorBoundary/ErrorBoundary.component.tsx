import { Component, ReactNode } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Błąd w komponencie:', error);
    console.error('Szczegóły błędu:', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-200 mb-2">Ups! Coś poszło nie tak</h2>
            <p className="text-gray-400 mb-4">Wystąpił błąd podczas ładowania tej sekcji.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
              Odśwież stronę
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
} 