import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

type LoadingErrorContainerProps = {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
};

/**
 * Komponent obsługujący stany ładowania i błędów dla gry JSTypoHunter
 */
export const LoadingErrorContainer = memo(({
  isLoading,
  error,
  children
}: LoadingErrorContainerProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 text-gray-400"
      >
        <FaSpinner className="animate-spin text-4xl mb-4 text-js" />
        <p className="text-lg">Ładowanie gry...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 text-gray-400"
      >
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-lg mb-2">Wystąpił błąd</p>
        <p className="text-sm text-red-400">{error.message}</p>
      </motion.div>
    );
  }

  if (!children) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 text-gray-400"
      >
        <FaExclamationTriangle className="text-yellow-500 text-4xl mb-4" />
        <p className="text-lg">Gra niedostępna</p>
      </motion.div>
    );
  }

  return <>{children}</>;
});

LoadingErrorContainer.displayName = 'LoadingErrorContainer'; 