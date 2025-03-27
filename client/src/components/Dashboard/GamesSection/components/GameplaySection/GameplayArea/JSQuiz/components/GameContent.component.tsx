import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizChallenge, GameStats } from '../../../../../types/jsQuiz.types';
import JSQuizGame from '../JSQuizGame';
import JSQuizSummary from '../JSQuizSummary';
import { useAnimations } from '../hooks/useAnimations';

type GameContentProps = {
  isGameOver: boolean;
  gameStats: GameStats;
  currentChallenge?: QuizChallenge;
  finalTime: number;
  gameContent: any;
  onScoreUpdate: (points: number, category: 'basics' | 'advanced' | 'frameworks') => void;
  onLevelComplete: () => void;
  onGameOver: () => void;
  onRestart: () => void;
};

export const GameContent = memo(({
  isGameOver,
  gameStats,
  currentChallenge,
  finalTime,
  gameContent,
  onScoreUpdate,
  onLevelComplete,
  onGameOver,
  onRestart
}: GameContentProps) => {
  const { gameAnimation, summaryAnimation } = useAnimations();

  if (!currentChallenge && !isGameOver) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-js">Ładowanie pytania...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <div className="flex-1 overflow-y-auto py-6">
        {!isGameOver ? (
          <motion.div
            key={`level-${gameStats.currentLevel}`}
            initial={gameAnimation.initial}
            animate={gameAnimation.animate}
            exit={gameAnimation.exit}
            transition={gameAnimation.transition}
            className="w-full"
          >
            {currentChallenge && (
              <JSQuizGame
                currentChallenge={currentChallenge}
                onScoreUpdate={onScoreUpdate}
                onLevelComplete={onLevelComplete}
                currentLevel={gameStats.currentLevel}
                totalLevels={gameStats.totalLevels}
                onGameOver={onGameOver}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="game-over"
            initial={summaryAnimation.initial}
            animate={summaryAnimation.animate}
            exit={summaryAnimation.exit}
            transition={summaryAnimation.transition}
          >
            <JSQuizSummary
              score={gameStats.score}
              timeElapsed={finalTime}
              challenges={gameContent?.gameData || []}
              correctAnswers={gameStats.correctAnswers}
              categoryStats={gameStats.categoryStats}
              onRestart={onRestart}
            />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
});

GameContent.displayName = 'GameContent'; 