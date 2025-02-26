import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaRedo } from 'react-icons/fa';

type CommentsErrorProps = {
  onRetry: () => void;
};

export const CommentsError = memo(({ onRetry }: CommentsErrorProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-6 text-center"
  >
    <FaExclamationCircle className="text-red-500 text-3xl mb-2" />
    <p className="text-gray-300 mb-4">
      Nie udało się załadować komentarzy
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRetry}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-js/10 text-js 
                 hover:bg-js/20 transition-colors"
    >
      <FaRedo className="text-sm" />
      Spróbuj ponownie
    </motion.button>
  </motion.div>
));

CommentsError.displayName = 'CommentsError'; 