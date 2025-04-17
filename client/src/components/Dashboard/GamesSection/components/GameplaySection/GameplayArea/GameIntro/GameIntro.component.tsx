import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaStar } from 'react-icons/fa';
import { GameContent } from '../../../../types/games.type';

type GameIntroProps = {
  gameContent: GameContent;
  onStart: () => void;
};

export const GameIntro = memo(({ gameContent, onStart }: GameIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-js mb-4 text-center">{gameContent.title}</h2>

      <div className="mb-6 text-gray-400 text-center">{gameContent.description}</div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-dark-900/50 rounded-lg text-center">
          <div className="text-sm text-gray-400">Poziom trudności</div>
          <div className="text-lg font-bold text-js capitalize">{gameContent.difficulty}</div>
        </div>

        <div className="p-4 bg-dark-900/50 rounded-lg text-center">
          <div className="text-sm text-gray-400">Punkty do zdobycia</div>
          <div className="text-lg font-bold text-js flex items-center justify-center gap-1">
            <FaStar className="w-4 h-4" />
            {gameContent.rewardPoints}
          </div>
        </div>

        <div className="p-4 bg-dark-900/50 rounded-lg text-center">
          <div className="text-sm text-gray-400">Szacowany czas</div>
          <div className="text-lg font-bold text-js">{gameContent.estimatedTime} min</div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full px-6 py-4 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors flex items-center justify-center gap-2"
      >
        <FaPlay className="w-4 h-4" />
        <span>Rozpocznij grę</span>
      </button>
    </motion.div>
  );
});

GameIntro.displayName = 'GameIntro';
