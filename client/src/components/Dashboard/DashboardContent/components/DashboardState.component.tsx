import { memo } from 'react';
import { motion } from 'framer-motion';

type DashboardStateProps = {
  type: 'loading' | 'error' | 'empty';
  message?: string;
};

export const DashboardState = memo(({ type, message }: DashboardStateProps) => {
  const getStateStyles = () => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="p-8 w-full flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-xl ${getStateStyles()}`}
      >
        {message ||
          (type === 'loading'
            ? 'Ładowanie danych...'
            : type === 'error'
              ? 'Wystąpił błąd podczas ładowania danych'
              : 'Brak danych do wyświetlenia')}
      </motion.div>
    </div>
  );
});

DashboardState.displayName = 'DashboardState';
