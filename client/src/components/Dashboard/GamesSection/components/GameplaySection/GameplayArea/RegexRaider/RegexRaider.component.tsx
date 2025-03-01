import { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/regexRaider.types';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { RegexRaiderStats } from './RegexRaiderStats/RegexRaiderStats.component';
import { RegexRaiderGame } from './RegexRaiderGame/RegexRaiderGame.component';
import { RegexRaiderSummary } from './RegexRaiderSummary/RegexRaiderSummary.component';
import { useGamesQuery } from '../../../../hooks/useGamesQuery';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { Game } from '../../../../types/games.types';

const RegexRaider = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { data, isLoading, error } = useGamesQuery();
  const gameContent = data?.games.find((game: Game) => game.slug === 'regex-raider');
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
  const [finalTime, setFinalTime] = useState(0);

  const { timeElapsed, resetTimer, startTimer, stopTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: () => {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      stopTimer();
    },
    isPaused,
  });

  useEffect(() => {
    if (gameContent) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData.length
      }));
    }
  }, [gameContent]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (!isGameOver) {
      setGameStats(prev => ({ ...prev, timeElapsed }));
    }
  }, [timeElapsed, isGameOver]);

  const handleScoreUpdate = useCallback((points: number) => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1
    }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    setGameStats(prev => {
      const nextLevel = prev.currentLevel + 1;
      if (nextLevel > prev.totalLevels) {
        setIsGameOver(true);
        setFinalTime(timeElapsed);
        stopTimer();
      }
      return { ...prev, currentLevel: nextLevel };
    });
  }, [timeElapsed, stopTimer]);

  const handleRestart = useCallback(() => {
    setGameStats({
      currentLevel: 1,
      totalLevels: gameStats.totalLevels,
      score: 0,
      timeElapsed: 0,
      maxTime: 300,
      correctAnswers: 0
    });
    setIsGameOver(false);
    resetTimer();
    startTimer();
  }, [resetTimer, startTimer]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>Błąd: {error.message}</div>;
  }

  if (!gameContent) {
    return null;
  }

  if (!isGameStarted) {
    return <GameIntro gameContent={gameContent} onStart={handleStartGame} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <RegexRaiderStats 
        stats={gameStats}
        isGameOver={isGameOver}
        finalTime={finalTime}
      />
      <AnimatePresence mode="wait">
        {!isGameOver ? (
          <RegexRaiderGame
            key={`level-${gameStats.currentLevel}`}
            onScoreUpdate={handleScoreUpdate}
            onLevelComplete={handleLevelComplete}
            currentLevel={gameStats.currentLevel}
            onGameOver={handleGameOver}
          />
        ) : (
          <RegexRaiderSummary
            key="game-over"
            score={gameStats.score}
            timeElapsed={finalTime}
            correctAnswers={gameStats.correctAnswers}
            totalLevels={gameStats.totalLevels}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

RegexRaider.displayName = 'RegexRaider'; 

export default RegexRaider;