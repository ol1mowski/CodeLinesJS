import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface LoadingErrorProps {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
}

export const LoadingError = memo(({ isLoading, error, children }: LoadingErrorProps) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl text-purple-300 mb-4"
        >
          <FaSpinner />
        </motion.div>
        <p className="text-xl font-medium text-purple-200">Ładowanie gry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl text-red-400 mb-4"
        >
          <FaExclamationTriangle />
        </motion.div>
        <h2 className="text-xl font-bold text-red-300 mb-2">Wystąpił błąd</h2>
        <p className="text-md text-red-200">{error.message}</p>
      </div>
    );
  }

  if (!children) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-lg text-purple-300">Gra niedostępna</p>
      </div>
    );
  }

  return <>{children}</>;
});

LoadingError.displayName = 'LoadingError';
