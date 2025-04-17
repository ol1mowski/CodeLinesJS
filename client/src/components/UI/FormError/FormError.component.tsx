import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

type FormErrorProps = {
  message: string;
  withIcon?: boolean;
  variant?: 'standard' | 'alert';
  title?: string;
  className?: string;
};

export const FormError = memo(
  ({
    message,
    withIcon = false,
    variant = 'standard',
    title = 'Błąd',
    className = '',
  }: FormErrorProps) => {
    if (!message) return null;

    if (variant === 'alert') {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start ${className}`}
        >
          <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">{title}</p>
            <p>{message}</p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm ${className} ${withIcon ? 'flex items-center' : ''}`}
      >
        {withIcon && <FaExclamationTriangle className="mr-2 flex-shrink-0" />}
        <span>{message}</span>
      </motion.div>
    );
  }
);

FormError.displayName = 'FormError';
