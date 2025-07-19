import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

type StartButtonProps = {
  onStart: () => void;
  loading?: boolean;
};

export const StartButton = memo(({ onStart, loading = false }: StartButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      onClick={onStart}
      disabled={loading}
      className={`w-full bg-gradient-to-r from-js to-js/80 text-dark font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
          Ładowanie pytań...
        </>
      ) : (
        <>
          <FaPlay className="w-5 h-5" />
          Rozpocznij test
        </>
      )}
    </motion.button>
  );
});

StartButton.displayName = 'StartButton'; 