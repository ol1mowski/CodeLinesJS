import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type GameIntroProps = {
  score: number;
  onStartGame: () => void;
};

export const GameIntro = memo(({ score, onStartGame }: GameIntroProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-dark/50 backdrop-blur-lg rounded-xl p-6 border border-js/20"
      >
        <h2 className="text-xl text-js mb-4 flex items-center gap-2">
          <FaGamepad className="text-js" />
          Zagraj w mini-grę JavaScript!
        </h2>
        <p className="text-gray-400 mb-4">
          Rozwiąż zadania JavaScript i zdobądź punkty. Może nawet pobijesz swój rekord?
        </p>
        {score > 0 && (
          <p className="text-lg text-js font-bold mb-4">Twój ostatni wynik: {score} pkt</p>
        )}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="px-6 py-3 rounded-lg bg-js text-dark font-bold flex items-center gap-2 
                     hover:bg-js/90 transition-all"
          >
            <FaGamepad />
            {score > 0 ? 'Zagraj ponownie' : 'Rozpocznij grę'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg border border-js/20 text-js font-bold flex items-center gap-2 
                     hover:bg-js/10 transition-all"
          >
            <FaHome />
            Wróć do strony głównej
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
});

GameIntro.displayName = 'GameIntro';
