import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

type LoadingErrorProps = {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
  loadingText?: string;
  errorText?: string;
  unavailableText?: string;
  spinnerColor?: string;
  containerClassName?: string;
  showUnavailableState?: boolean;
};

export const LoadingError = memo(({ 
  isLoading, 
  error, 
  children,
  loadingText = 'Ładowanie...',
  errorText = 'Wystąpił błąd',
  unavailableText = 'Niedostępne',
  spinnerColor = 'text-js',
  containerClassName = 'h-full flex flex-col items-center justify-center',
  showUnavailableState = false
}: LoadingErrorProps) => {
  if (isLoading) {
    return (
      <div className={containerClassName}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`text-4xl ${spinnerColor} mb-4`}
        >
          <FaSpinner />
        </motion.div>
        <p className="text-xl font-medium text-gray-100">{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${containerClassName} text-center p-6`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl text-red-400 mb-4"
        >
          <FaExclamationTriangle />
        </motion.div>
        <h2 className="text-xl font-bold text-red-300 mb-2">{errorText}</h2>
        <p className="text-md text-red-200">{error.message}</p>
      </div>
    );
  }

  if (showUnavailableState && !children) {
    return (
      <div className={containerClassName}>
        <FaExclamationTriangle className="text-yellow-500 text-4xl mb-4" />
        <p className="text-lg text-gray-400">{unavailableText}</p>
      </div>
    );
  }

  return <>{children}</>;
});

LoadingError.displayName = 'LoadingError'; 