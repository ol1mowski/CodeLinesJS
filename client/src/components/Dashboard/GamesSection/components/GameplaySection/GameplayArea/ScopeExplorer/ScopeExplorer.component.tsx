import { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats, ScopeChallenge } from '../../../../types/scopeExplorer.types';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { ScopeExplorerStats } from './ScopeExplorerStats/ScopeExplorerStats.component';
import { ScopeExplorerGame } from './ScopeExplorerGame/ScopeExplorerGame.component';
import { ScopeExplorerSummary } from './ScopeExplorerSummary/ScopeExplorerSummary.component';
import { useGamesQuery } from '../../../../hooks/useGamesQuery';
import { GameIntro } from '../GameIntro/GameIntro.component';


type Game = {
  slug: string;
  estimatedTime: number;
  gameData: ScopeChallenge[];
}

const ScopeExplorer = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { data, isLoading, error } = useGamesQuery();
  const gameContent = data?.games.find((game: Game) => game.slug === 'scope-explorer');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0,
    categoryStats: {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    }
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const { timeElapsed, resetTimer, startTimer, stopTimer } = useGameTimer({
    maxTime: gameContent?.estimatedTime ? gameContent.estimatedTime * 60 : 300,
    onTimeEnd: () => {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      stopTimer();
    },
    isPaused,
  });

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed
    }));
  }, [timeElapsed]);

  useEffect(() => {
    if (!gameContent?.gameData) return;
    
    const initialCategoryStats = {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    };

    gameContent.gameData.forEach((challenge: ScopeChallenge) => {
      const category = challenge.category as keyof typeof initialCategoryStats;
      initialCategoryStats[category].total++;
      initialCategoryStats[category].points += challenge.points || 0;
    });

    setGameStats(prev => ({
      ...prev,
      totalLevels: gameContent.gameData.length,
      maxTime: gameContent.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      categoryStats: initialCategoryStats
    }));
  }, [gameContent]);

  const handleScoreUpdate = useCallback((points: number, category: 'scope' | 'closure' | 'hoisting') => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1,
      categoryStats: {
        ...prev.categoryStats,
        [category]: {
          ...prev.categoryStats[category],
          correct: prev.categoryStats[category].correct + 1
        }
      }
    }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    const nextLevel = gameStats.currentLevel + 1;
    if (nextLevel > (gameContent?.gameData?.length || 0)) {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      stopTimer();
      return;
    }

    setGameStats(prev => ({
      ...prev,
      currentLevel: nextLevel
    }));
  }, [gameStats.currentLevel, timeElapsed, gameContent?.gameData?.length, stopTimer]);

  const handleRestart = useCallback(() => {
    if (!gameContent?.gameData) return;
    
    const initialCategoryStats = {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    };

    gameContent.gameData.forEach((challenge: ScopeChallenge) => {
      const category = challenge.category as keyof typeof initialCategoryStats;
      initialCategoryStats[category].total++;
      initialCategoryStats[category].points += challenge.points || 0;
    });

    setGameStats({
      currentLevel: 1,
      totalLevels: gameContent.gameData.length,
      score: 0,
      timeElapsed: 0,
      maxTime: gameContent.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      correctAnswers: 0,
      categoryStats: initialCategoryStats
    });
    setIsGameOver(false);
    setFinalTime(0);
    resetTimer();
    startTimer();
  }, [resetTimer, startTimer, gameContent]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error.message}</div>;
  if (!gameContent) return null;

  if (!isGameStarted) {
    return <GameIntro gameContent={gameContent} onStart={handleStartGame} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col"
    >
      <ScopeExplorerStats 
        stats={gameStats} 
        isGameOver={isGameOver}
        finalTime={finalTime}
      />
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
              <ScopeExplorerGame
                currentChallenge={gameContent.gameData[gameStats.currentLevel - 1]}
                onScoreUpdate={handleScoreUpdate}
                onLevelComplete={handleLevelComplete}
                currentLevel={gameStats.currentLevel}
                totalLevels={gameStats.totalLevels}
                onGameOver={handleGameOver}
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
              <ScopeExplorerSummary
                score={gameStats.score}
                timeElapsed={finalTime}
                challenges={gameContent.gameData}
                correctAnswers={gameStats.correctAnswers}
                categoryStats={gameStats.categoryStats}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
});

export default ScopeExplorer;

ScopeExplorer.displayName = 'ScopeExplorer'; 