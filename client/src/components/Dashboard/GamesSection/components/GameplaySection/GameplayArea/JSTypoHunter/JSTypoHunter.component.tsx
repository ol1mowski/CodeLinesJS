import { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/jsTypoHunter.types';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { JSTypoHunterGame } from './JSTypoHunterGame/JSTypoHunterGame.component';
import { useGameTimer } from './hooks/useGameTimer';
import { useGamesQuery } from '../../../../hooks/useGamesQuery';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { JSTypoHunterSummary } from './JSTypoHunterSummary/JSTypoHunterSummary.component';
import { Game } from '../../../../types/games.types';
import { Helmet } from 'react-helmet';

const getDifficultyPoints = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 20;
    case 'hard':
      return 30;
    default:
      return 10;
  }
};

const JSTypoHunter = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { data, isLoading, error } = useGamesQuery();
  const gameContent = data?.games.find((game: Game) => game.slug === 'js-typo-hunter');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const { timeElapsed, resetTimer, startTimer, stopTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: () => {
      setIsGameOver(true);
      stopTimer();
    },
    isPaused,
  });

  const handleScoreUpdate = useCallback((points: number) => {
    const currentChallenge = gameContent?.gameData[gameStats.currentLevel - 1];
    const difficultyPoints = getDifficultyPoints(currentChallenge?.difficulty || 'easy');
    const totalPoints = points + difficultyPoints;

    setGameStats(prev => ({
      ...prev,
      score: prev.score + totalPoints,
      correctAnswers: prev.correctAnswers + 1
    }));
  }, [gameStats.currentLevel, gameContent]);

  const handleIncorrectAnswer = useCallback(() => {
    setIsGameOver(true);
    stopTimer();
  }, [stopTimer]);

  const handleLevelComplete = useCallback(() => {
    setTimeout(() => {
      const nextLevel = gameStats.currentLevel + 1;
      if (nextLevel > (gameContent?.gameData.length || 0)) {
        setIsGameOver(true);
        stopTimer();
      } else {
        setGameStats(prev => ({
          ...prev,
          currentLevel: nextLevel
        }));
      }
    }, 1000);
  }, [gameStats.currentLevel, gameContent, stopTimer]);

  const handleRestart = useCallback(() => {
    setGameStats({
      currentLevel: 1,
      totalLevels: gameContent?.gameData.length || 0,
      score: 0,
      timeElapsed: 0,
      maxTime: 300,
      correctAnswers: 0
    });
    setIsGameOver(false);
    resetTimer();
    startTimer();
  }, [resetTimer, startTimer, gameContent]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed
    }));
  }, [timeElapsed]);

  useEffect(() => {
    if (gameContent) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData.length
      }));
    }
  }, [gameContent]);

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
      className="w-full space-y-6"
    >
      <Helmet>
        <title>JSTypoHunter | CodeLinesJS</title>
        <meta name="description" content="JSTypoHunter CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku." />
      </Helmet>
      <JSTypoHunterStats stats={gameStats} />
      <AnimatePresence mode="wait">
        {isGameOver ? (
          <JSTypoHunterSummary
            key="game-over"
            score={gameStats.score}
            timeElapsed={timeElapsed}
            correctAnswers={gameStats.correctAnswers}
            totalLevels={gameContent?.gameData.length || 0}
            onRestart={handleRestart}
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
              currentChallenge={gameContent?.gameData[gameStats.currentLevel - 1]}
              onScoreUpdate={handleScoreUpdate}
              onLevelComplete={handleLevelComplete}
              onIncorrectAnswer={handleIncorrectAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter';

export default JSTypoHunter;
