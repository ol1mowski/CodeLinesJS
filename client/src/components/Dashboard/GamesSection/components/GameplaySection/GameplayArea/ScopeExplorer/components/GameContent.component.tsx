import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScopeChallenge, GameStats } from '../../../../../types/scopeExplorer.types';
import { ScopeExplorerGame } from '../ScopeExplorerGame/ScopeExplorerGame.component';
import { ScopeExplorerSummary } from '../ScopeExplorerSummary/ScopeExplorerSummary.component';
import { useAnimations } from '../hooks/useAnimations';

type GameContentProps = {
  isGameOver: boolean;
  gameStats: GameStats;
  currentChallenge?: ScopeChallenge;
  finalTime: number;
  challenges?: ScopeChallenge[];
  onScoreUpdate: (points: number, category: 'scope' | 'closure' | 'hoisting') => void;
  onLevelComplete: () => void;
  onGameOver: () => void;
  onRestart: () => void;
};

export const GameContent = memo(
  ({
    isGameOver,
    gameStats,
    currentChallenge,
    finalTime,
    challenges,
    onScoreUpdate,
    onLevelComplete,
    onGameOver,
    onRestart,
  }: GameContentProps) => {
    const { gameAnimation, summaryAnimation } = useAnimations();

    if (!currentChallenge && !isGameOver) {
      return null;
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
              <ScopeExplorerGame
                currentChallenge={currentChallenge!}
                onScoreUpdate={onScoreUpdate}
                onLevelComplete={onLevelComplete}
                currentLevel={gameStats.currentLevel}
                totalLevels={gameStats.totalLevels}
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
              <ScopeExplorerSummary
                score={gameStats.score}
                timeElapsed={finalTime}
                challenges={challenges || []}
                correctAnswers={gameStats.correctAnswers}
                categoryStats={gameStats.categoryStats}
                onRestart={onRestart}
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    );
  }
);

GameContent.displayName = 'GameContent';
