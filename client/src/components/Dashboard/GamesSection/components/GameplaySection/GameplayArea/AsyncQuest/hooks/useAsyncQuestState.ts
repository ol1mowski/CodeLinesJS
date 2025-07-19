import { useState, useCallback, useEffect } from 'react';
import { GameStats, AsyncChallenge } from '../types/asyncQuest.types';
import { Game } from '../../../../../types/games.types';
import { useGameTimer } from '../../JSTypoHunter/hooks/useGameTimer';

interface UseAsyncQuestStateProps {
  gameContent: Game | undefined;
  isPaused: boolean;
}

export const useAsyncQuestState = ({ gameContent, isPaused }: UseAsyncQuestStateProps) => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const initialCategoryStats = {
    promises: { total: 0, correct: 0, points: 0 },
    'async-await': { total: 0, correct: 0, points: 0 },
    callbacks: { total: 0, correct: 0, points: 0 },
  };

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: gameContent?.estimatedTime ? gameContent.estimatedTime * 60 : 300,
    correctAnswers: 0,
    categoryStats: initialCategoryStats,
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
    if (gameContent) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData?.length || 0,
      }));
    }
  }, [gameContent]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      setGameStats(prev => ({ ...prev, timeElapsed }));
    }
  }, [timeElapsed, isGameOver, isPaused]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      startTimer();
    }
  }, [isGameOver, isPaused, startTimer]);

  const handleScoreUpdate = useCallback(
    (points: number, category: 'promises' | 'async-await' | 'callbacks') => {
      setGameStats(prev => ({
        ...prev,
        score: prev.score + points,
        correctAnswers: prev.correctAnswers + 1,
        categoryStats: {
          ...prev.categoryStats,
          [category]: {
            ...prev.categoryStats[category],
            total: prev.categoryStats[category].total + 1,
            correct: prev.categoryStats[category].correct + 1,
            points: prev.categoryStats[category].points + points,
          },
        },
      }));
    },
    []
  );

  const handleLevelComplete = useCallback(() => {
    const nextLevel = gameStats.currentLevel + 1;
    if (nextLevel > gameStats.totalLevels) {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      stopTimer();
    } else {
      setGameStats(prev => ({ ...prev, currentLevel: nextLevel }));
    }
  }, [gameStats.currentLevel, gameStats.totalLevels, timeElapsed, stopTimer]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

  const handleRestart = useCallback(() => {
    if (!gameContent) return;

    const initialCategoryStats = {
      promises: { total: 0, correct: 0, points: 0 },
      'async-await': { total: 0, correct: 0, points: 0 },
      callbacks: { total: 0, correct: 0, points: 0 },
    };

    gameContent.gameData?.forEach((challenge: AsyncChallenge) => {
      if (challenge.category) {
        initialCategoryStats[challenge.category].total++;
      }
    });

    setGameStats({
      currentLevel: 1,
      totalLevels: gameContent.gameData?.length || 0,
      score: 0,
      timeElapsed: 0,
      maxTime: gameContent.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      correctAnswers: 0,
      categoryStats: initialCategoryStats,
    });

    setIsGameOver(false);
    resetTimer();
    startTimer();
  }, [gameContent, resetTimer, startTimer]);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer();
  }, [startTimer]);

  const currentChallenge = gameContent?.gameData?.[gameStats.currentLevel - 1];

  return {
    isGameStarted,
    isGameOver,
    gameStats,
    finalTime,
    currentChallenge,
    handleScoreUpdate,
    handleLevelComplete,
    handleGameOver,
    handleRestart,
    handleStartGame,
  };
};
