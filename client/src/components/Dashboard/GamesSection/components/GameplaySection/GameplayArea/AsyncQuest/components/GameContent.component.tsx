import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AsyncQuestGame } from '../AsyncQuestGame/AsyncQuestGame.component';
import { AsyncQuestSummary } from '../AsyncQuestSummary/AsyncQuestSummary.component';
import { GameStats } from '../types/asyncQuest.types';
import { Game } from '../../../../../types/games.types';

interface GameContentProps {
  isGameOver: boolean;
  gameStats: GameStats;
  finalTime: number;
  currentChallenge: any;
  gameContent: Game | undefined;
  onScoreUpdate: (points: number, category: 'promises' | 'async-await' | 'callbacks') => void;
  onLevelComplete: () => void;
  onGameOver: () => void;
  onRestart: () => void;
}

export const GameContent = memo(
  ({
    isGameOver,
    gameStats,
    finalTime,
    currentChallenge,
    gameContent,
    onScoreUpdate,
    onLevelComplete,
    onGameOver,
    onRestart,
  }: GameContentProps) => {
    return (
      <AnimatePresence mode="wait">
        <div className="flex-1 overflow-y-auto py-6">
          {!isGameOver ? (
            <motion.div
              key={`level-${gameStats.currentLevel}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AsyncQuestGame
                currentChallenge={currentChallenge}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <AsyncQuestSummary
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
  }
);

GameContent.displayName = 'GameContent';
