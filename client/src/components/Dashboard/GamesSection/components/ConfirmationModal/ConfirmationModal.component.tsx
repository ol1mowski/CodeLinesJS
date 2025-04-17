import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

type ConfirmationModalProps = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = memo(
  ({
    title,
    message,
    confirmText = 'Potwierdź',
    cancelText = 'Anuluj',
    onConfirm,
    onCancel,
  }: ConfirmationModalProps) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-900/80 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-dark-800 rounded-xl p-6 max-w-md w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold text-js">{title}</h2>
          </div>

          <p className="text-gray-300 mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-lg bg-dark-700 text-gray-300 font-medium hover:bg-dark-600 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ConfirmationModal.displayName = 'ConfirmationModal';
