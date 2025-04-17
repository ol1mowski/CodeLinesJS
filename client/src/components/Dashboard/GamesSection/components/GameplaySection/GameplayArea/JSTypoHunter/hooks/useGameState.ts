import { useState, useCallback, useEffect } from 'react';
import { GameStats } from '../../../../../types/jsTypoHunter.types';
import { Game } from '../../../../../types/games.types';
import { useGameTimer } from './useGameTimer';

type Difficulty = 'easy' | 'medium' | 'hard';

const getDifficultyPoints = (difficulty: Difficulty): number => {
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

interface UseGameStateProps {
  gameContent: Game | undefined;
  isPaused: boolean;
}

export const useGameState = ({ gameContent, isPaused }: UseGameStateProps) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0,
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

  const handleScoreUpdate = useCallback(
    (points: number) => {
      const currentChallenge = gameContent?.gameData?.[gameStats.currentLevel - 1];
      const difficultyPoints = getDifficultyPoints(currentChallenge?.difficulty || 'easy');
      const totalPoints = points + difficultyPoints;

      setGameStats(prev => ({
        ...prev,
        score: prev.score + totalPoints,
        correctAnswers: prev.correctAnswers + 1,
      }));
    },
    [gameStats.currentLevel, gameContent]
  );

  const handleIncorrectAnswer = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

  const handleLevelComplete = useCallback(() => {
    setTimeout(() => {
      const nextLevel = gameStats.currentLevel + 1;
      if (nextLevel > (gameContent?.gameData?.length || 0)) {
        setIsGameOver(true);
        setFinalTime(timeElapsed);
        stopTimer();
      } else {
        setGameStats(prev => ({
          ...prev,
          currentLevel: nextLevel,
        }));
      }
    }, 1000);
  }, [gameStats.currentLevel, gameContent, timeElapsed, stopTimer]);

  const handleRestart = useCallback(() => {
    if (!gameContent) return;

    setGameStats({
      currentLevel: 1,
      totalLevels: gameContent?.gameData?.length || 0,
      score: 0,
      timeElapsed: 0,
      maxTime: gameContent?.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      correctAnswers: 0,
    });
    setIsGameOver(false);
    setFinalTime(0);
    resetTimer();
    startTimer();
  }, [resetTimer, startTimer, gameContent]);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed,
    }));
  }, [timeElapsed]);

  useEffect(() => {
    if (gameContent) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData?.length || 0,
        maxTime: gameContent?.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      }));
    }
  }, [gameContent]);

  // Pobierz aktualny challenge bazując na poziomie
  const currentChallenge = gameContent?.gameData?.[gameStats.currentLevel - 1];

  return {
    isGameStarted,
    isGameOver,
    gameStats,
    finalTime,
    currentChallenge,
    handleScoreUpdate,
    handleIncorrectAnswer,
    handleLevelComplete,
    handleRestart,
    handleStartGame,
  };
};
