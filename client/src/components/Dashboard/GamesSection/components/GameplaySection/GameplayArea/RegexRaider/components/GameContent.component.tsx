import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegexRaiderGame } from '../RegexRaiderGame/RegexRaiderGame.component';
import { RegexRaiderSummary } from '../RegexRaiderSummary/RegexRaiderSummary.component';
import { useAnimations } from '../hooks/useAnimations';
import { GameStats } from '../../../../../types/regexRaider.types';

type GameContentProps = {
  isGameOver: boolean;
  gameStats: GameStats;
  finalTime: number;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
  onGameOver: () => void;
  onRestart: () => void;
};

export const GameContent = memo(({
  isGameOver,
  gameStats,
  finalTime,
  onScoreUpdate,
  onLevelComplete,
  onGameOver,
  onRestart
}: GameContentProps) => {
  const { gameAnimation, summaryAnimation } = useAnimations();

  return (
    <AnimatePresence mode="wait">
      {!isGameOver ? (
        <motion.div
          key={`level-${gameStats.currentLevel}`}
          initial={gameAnimation.initial}
          animate={gameAnimation.animate}
          exit={gameAnimation.exit}
          transition={gameAnimation.transition}
          className="w-full"
        >
          <RegexRaiderGame
            onScoreUpdate={onScoreUpdate}
            onLevelComplete={onLevelComplete}
            currentLevel={gameStats.currentLevel}
            onGameOver={onGameOver}
          />
        </motion.div>
      ) : (
        <motion.div
          key="game-over"
          initial={summaryAnimation.initial}
          animate={summaryAnimation.animate}
          exit={summaryAnimation.exit}
          transition={summaryAnimation.transition}
        >
          <RegexRaiderSummary
            score={gameStats.score}
            timeElapsed={finalTime}
            correctAnswers={gameStats.correctAnswers}
            totalLevels={gameStats.totalLevels}
            onRestart={onRestart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

GameContent.displayName = 'GameContent'; 