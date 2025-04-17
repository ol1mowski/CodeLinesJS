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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-64 flex items-center justify-center"
      >
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-js mx-auto mb-4" />
          <div className="text-xl font-medium text-gray-100">Ładowanie gry...</div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-64 flex items-center justify-center"
      >
        <div className="text-center">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <div className="text-xl font-medium text-gray-100 mb-2">Wystąpił błąd</div>
          <div className="text-red-400">{error.message}</div>
        </div>
      </motion.div>
    );
  }

  if (!children) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-64 flex items-center justify-center"
      >
        <div className="text-center">
          <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
          <div className="text-xl font-medium text-gray-100">Gra niedostępna</div>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
});

LoadingError.displayName = 'LoadingError';
