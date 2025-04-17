import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

type ErrorAlertProps = {
  message: string;
  title?: string;
};

export const ErrorAlert = ({ message, title = 'Błąd' }: ErrorAlertProps) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start"
    >
      <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold mb-1">{title}</p>
        <p>{message}</p>
      </div>
    </motion.div>
  );
};
