import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

type LoadingErrorContainerProps = {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
};

export const LoadingErrorContainer = memo(
  ({ isLoading, error, children }: LoadingErrorContainerProps) => {
    if (isLoading) {
      return (
        <div className="w-full h-64 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-js text-4xl mx-auto mb-4"
            >
              <FaSpinner />
            </motion.div>
            <div className="text-xl font-medium text-gray-100 mb-2">Ładowanie gry...</div>
          </motion.div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full h-64 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-red-500 text-4xl mx-auto mb-4">
              <FaExclamationTriangle />
            </div>
            <div className="text-xl font-medium text-gray-100 mb-2">Wystąpił błąd</div>
            <div className="text-gray-400">{error.message}</div>
          </motion.div>
        </div>
      );
    }

    return <>{children}</>;
  }
);

LoadingErrorContainer.displayName = 'LoadingErrorContainer';
