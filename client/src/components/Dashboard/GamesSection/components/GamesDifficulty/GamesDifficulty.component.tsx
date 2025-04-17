import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { FaRegCircle, FaCircle } from 'react-icons/fa';
import { GameDifficulty } from '../../../../../types/games.types';

type GamesDifficultyProps = {
  selectedDifficulty: GameDifficulty | 'all';
  onDifficultyChange: (difficulty: GameDifficulty | 'all') => void;
};

const difficulties = [
  { value: 'all' as const, label: 'Wszystkie' },
  { value: 'easy' as const, label: 'Łatwe', color: 'text-emerald-400' },
  { value: 'medium' as const, label: 'Średnie', color: 'text-indigo-400' },
  { value: 'hard' as const, label: 'Trudne', color: 'text-rose-400' },
];

export const GamesDifficulty = memo(
  ({ selectedDifficulty, onDifficultyChange }: GamesDifficultyProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <span className="text-gray-400 text-sm">Poziom:</span>
        <div className="flex gap-3 flex-wrap">
          {difficulties.map(difficulty => (
            <motion.button
              key={difficulty.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDifficultyChange(difficulty.value)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all relative
              ${
                selectedDifficulty === difficulty.value
                  ? `text-${difficulty.color || 'gray-200'}`
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {selectedDifficulty === difficulty.value && (
                <motion.div
                  layoutId="difficulty-background"
                  className={`absolute inset-0 bg-gray-800/50 border rounded-lg -z-10 border-${difficulty.color || 'gray-400'}`}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDifficulty === difficulty.value ? 'circle' : 'circle-outline'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedDifficulty === difficulty.value ? (
                    <FaCircle className={`w-3 h-3 ${difficulty.color || 'text-gray-400'}`} />
                  ) : (
                    <FaRegCircle className="w-3 h-3" />
                  )}
                </motion.div>
              </AnimatePresence>
              {difficulty.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }
);

GamesDifficulty.displayName = 'GamesDifficulty';
