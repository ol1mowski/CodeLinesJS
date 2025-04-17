import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
};

export const FormWrapper = ({ children, onSubmit, className = '' }: FormWrapperProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`space-y-6 ${className}`}
    >
      {children}
    </motion.form>
  );
};
