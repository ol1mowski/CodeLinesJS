import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

type ToastType = 'success' | 'error';

type ToastProps = {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
};

export const Toast = memo(({ message, type, isVisible, onClose }: ToastProps) => {
  const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;
  const bgColor = type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10';
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
  const borderColor = type === 'success' ? 'border-green-500/20' : 'border-red-500/20';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 
                     rounded-lg border backdrop-blur-sm shadow-lg
                     ${bgColor} ${borderColor}`}
          onClick={onClose}
        >
          <Icon className={`text-lg ${textColor}`} />
          <p className="text-sm text-gray-200">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Toast.displayName = 'Toast'; 