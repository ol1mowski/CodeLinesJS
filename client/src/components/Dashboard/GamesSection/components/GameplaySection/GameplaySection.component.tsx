import { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Game } from '../../../../../types/games.types';
import { GameplayHeader } from './GameplayHeader/GameplayHeader.component';
import { GameplayArea } from './GameplayArea/GameplayArea.component';

type GameplaySectionProps = {
  game: Game;
};

export const GameplaySection = memo(({ game }: GameplaySectionProps) => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/dashboard/play');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-800 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToMenu}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Powrót do menu</span>
          </motion.button>
        </div>

        <GameplayHeader title={game.title} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <GameplayArea />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GameplaySection.displayName = 'GameplaySection';
