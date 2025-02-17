import { memo } from 'react';
import { motion } from 'framer-motion';
import { Game } from '../../types/api.types';
import { GameplayHeader } from './GameplayHeader/GameplayHeader.component';
import { GameplayControls } from './GameplayControls/GameplayControls.component';
import { GameplayStats } from './GameplayStats/GameplayStats.component';
import { GameplayArea } from './GameplayArea/GameplayArea.component';
import { useGameplay } from '../../hooks/useGameplay';

type GameplaySectionProps = {
  game: Game;
};

export const GameplaySection = memo(({ game }: GameplaySectionProps) => {
  const { stats, controls, actions } = useGameplay();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-900 text-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <GameplayHeader 
          title={game.title}
          isPaused={controls.isPaused}
          onPauseToggle={actions.togglePause}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lewa kolumna ze statystykami */}
          <div className="lg:col-span-2">
            <GameplayStats stats={stats} />
          </div>

          {/* Środkowa kolumna z głównym obszarem gry */}
          <div className="lg:col-span-8">
            <GameplayArea 
              isPaused={controls.isPaused}
              isFullscreen={controls.isFullscreen}
            />
          </div>

          {/* Prawa kolumna z kontrolkami */}
          <div className="lg:col-span-2">
            <GameplayControls
              controls={controls}
              onPauseToggle={actions.togglePause}
              onFullscreenToggle={actions.toggleFullscreen}
              onVolumeChange={actions.updateVolume}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GameplaySection.displayName = 'GameplaySection'; 