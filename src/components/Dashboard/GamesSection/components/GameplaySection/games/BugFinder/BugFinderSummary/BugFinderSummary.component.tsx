import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaClock, FaHeart, FaRedo, FaArrowLeft } from 'react-icons/fa';
import { GameState } from '../types/bugFinder.types';

type BugFinderSummaryProps = {
  gameState: GameState;
  onRestart: () => void;
  onExit: () => void;
};

export const BugFinderSummary = memo(({ gameState, onRestart, onExit }: BugFinderSummaryProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-900/90 border border-js/20 rounded-xl p-8 max-w-lg w-full"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-16 h-16 rounded-full bg-js/10 flex items-center justify-center mb-4"
          >
            <FaTrophy className="w-8 h-8 text-js" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-js mb-6">
            Gratulacje! Ukończyłeś grę!
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Wynik</div>
                <div className="text-2xl font-bold text-js">{gameState.score}</div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Czas</div>
                <div className="flex items-center justify-center gap-1">
                  <FaClock className="w-4 h-4 text-js" />
                  <span className="text-2xl font-bold text-js">{gameState.timeElapsed}s</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Pozostałe życia</div>
                <div className="flex items-center justify-center gap-1">
                  <FaHeart className="w-4 h-4 text-js" />
                  <span className="text-2xl font-bold text-js">{gameState.lives}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
            >
              <FaRedo className="w-4 h-4" />
              <span>Zagraj ponownie</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-dark-700 text-js font-medium hover:bg-dark-600 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Wróć do menu</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

BugFinderSummary.displayName = 'BugFinderSummary'; 