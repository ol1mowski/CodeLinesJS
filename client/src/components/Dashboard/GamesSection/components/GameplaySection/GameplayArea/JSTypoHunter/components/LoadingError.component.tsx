import { memo, ReactNode } from 'react';

interface LoadingErrorProps {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
}

export const LoadingError = memo(({
  isLoading,
  error,
  children
}: LoadingErrorProps) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-100 mb-2">Ładowanie gry...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-100 mb-2">Wystąpił błąd: {error.message}</div>
        </div>
      </div>
    );
  }
  
  if (!children) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-100 mb-2">Gra niedostępna</div>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
});

LoadingError.displayName = 'LoadingError'; 