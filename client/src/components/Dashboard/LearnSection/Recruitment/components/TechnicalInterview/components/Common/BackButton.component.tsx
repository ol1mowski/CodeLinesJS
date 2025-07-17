import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

type BackButtonProps = {
  onBack: () => void;
  label?: string;
};

export const BackButton = memo(({ onBack, label = 'Powrót' }: BackButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onBack}
      className="flex items-center gap-2 text-gray-400 hover:text-js transition-colors"
    >
      <FaArrowLeft className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </motion.button>
  );
});

BackButton.displayName = 'BackButton'; 