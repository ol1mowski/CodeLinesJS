import { memo } from 'react';
import { motion } from 'framer-motion';

type SuccessMessageProps = {
  onReset: () => void;
  title?: string;
  message?: string;
  buttonLabel?: string;
};

export const SuccessMessage = memo(
  ({
    onReset,
    title = 'Dziękujemy za zgłoszenie!',
    message = 'Twoje zgłoszenie zostało przyjęte. Odpowiemy najszybciej jak to możliwe.',
    buttonLabel = 'Zgłoś kolejny błąd',
  }: SuccessMessageProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
    >
      <p className="text-green-400 font-medium mb-2">{title}</p>
      <p className="text-gray-400">{message}</p>
      <button
        onClick={onReset}
        className="mt-4 bg-js text-dark font-medium px-4 py-2 rounded-lg hover:bg-js/90 transition-colors"
      >
        {buttonLabel}
      </button>
    </motion.div>
  )
);

SuccessMessage.displayName = 'SuccessMessage';
