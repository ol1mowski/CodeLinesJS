import { useState, useCallback, useEffect } from 'react';
import { GameStats } from '../../../../../types/regexRaider.types';
import { useGameTimer } from '../../JSTypoHunter/hooks/useGameTimer';
import { Game } from '../../../../../types/api.types';

type UseRegexRaiderGameProps = {
  gameContent: Game | undefined;
  isPaused: boolean;
};

export const useRegexRaiderGame = ({ gameContent, isPaused }: UseRegexRaiderGameProps) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0
  });

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
    if (gameContent?.gameData) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData.length
      }));
    }
  }, [gameContent]);

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
    setGameStats(prev => ({
      currentLevel: 1,
      totalLevels: prev.totalLevels,
      score: 0,
      timeElapsed: 0,
      maxTime: 300,
      correctAnswers: 0
    }));
    setIsGameOver(false);
    resetTimer();
    startTimer();
  }, [resetTimer, startTimer]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer();
  }, [startTimer]);

  return {
    isGameStarted,
    isGameOver,
    finalTime,
    gameStats,
    currentChallenge: gameContent?.gameData ? gameContent.gameData[gameStats.currentLevel - 1] : undefined,
    handleScoreUpdate,
    handleLevelComplete,
    handleRestart,
    handleStartGame,
    handleGameOver
  };
}; 