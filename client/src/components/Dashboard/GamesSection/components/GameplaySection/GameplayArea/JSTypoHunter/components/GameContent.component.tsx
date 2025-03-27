import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JSTypoHunterGame } from '../JSTypoHunterGame/JSTypoHunterGame.component';
import { JSTypoHunterSummary } from '../JSTypoHunterSummary/JSTypoHunterSummary.component';
import { GameStats } from '../../../../../types/jsTypoHunter.types';

interface GameContentProps {
  isGameOver: boolean;
  gameStats: GameStats;
  finalTime: number;
  currentChallenge: any;
  totalLevels: number;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
  onIncorrectAnswer: () => void;
  onRestart: () => void;
}

export const GameContent = memo(({
  isGameOver,
  gameStats,
  finalTime,
  currentChallenge,
  totalLevels,
  onScoreUpdate,
  onLevelComplete,
  onIncorrectAnswer,
  onRestart
}: GameContentProps) => {
  return (
    <AnimatePresence mode="wait">
      {isGameOver ? (
        <JSTypoHunterSummary
          key="game-over"
          score={gameStats.score}
          timeElapsed={finalTime}
          correctAnswers={gameStats.correctAnswers}
          totalLevels={totalLevels}
          onRestart={onRestart}
        />
      ) : (
        <motion.div
          key={`level-${gameStats.currentLevel}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <JSTypoHunterGame 
            currentChallenge={currentChallenge}
            onScoreUpdate={onScoreUpdate}
            onLevelComplete={onLevelComplete}
            onIncorrectAnswer={onIncorrectAnswer}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

GameContent.displayName = 'GameContent'; 