import { useState, useCallback, useEffect } from 'react';
import { GameStats, QuizChallenge } from '../../../../../types/jsQuiz.types';
import { useGameTimer } from '../../JSTypoHunter/hooks/useGameTimer';

type Game = {
  slug: string;
  estimatedTime: number;
  gameData: QuizChallenge[];
};

type UseJSQuizGameProps = {
  gameContent: Game | undefined;
  isPaused: boolean;
};

export const useJSQuizGame = ({ gameContent, isPaused }: UseJSQuizGameProps) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0,
    categoryStats: {
      basics: { total: 0, correct: 0, points: 0 },
      advanced: { total: 0, correct: 0, points: 0 },
      frameworks: { total: 0, correct: 0, points: 0 }
    }
  });

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
      basics: { total: 0, correct: 0, points: 0 },
      advanced: { total: 0, correct: 0, points: 0 },
      frameworks: { total: 0, correct: 0, points: 0 }
    };

    gameContent.gameData.forEach((challenge: QuizChallenge) => {
      const category = challenge.category as keyof typeof initialCategoryStats;
      if (category && initialCategoryStats[category]) {
        initialCategoryStats[category].total++;
        initialCategoryStats[category].points += challenge.points || 0;
      }
    });

    setGameStats(prev => ({
      ...prev,
      totalLevels: gameContent.gameData.length,
      maxTime: gameContent.estimatedTime ? gameContent.estimatedTime * 60 : 300,
      categoryStats: initialCategoryStats
    }));
  }, [gameContent]);

  const handleScoreUpdate = useCallback((points: number, category: 'basics' | 'advanced' | 'frameworks') => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1,
      categoryStats: {
        ...prev.categoryStats,
        [category]: prev.categoryStats[category] ? {
          ...prev.categoryStats[category],
          correct: prev.categoryStats[category].correct + 1
        } : { total: 0, correct: 1, points: points }
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
      basics: { total: 0, correct: 0, points: 0 },
      advanced: { total: 0, correct: 0, points: 0 },
      frameworks: { total: 0, correct: 0, points: 0 }
    };

    gameContent.gameData.forEach((challenge: QuizChallenge) => {
      const category = challenge.category as keyof typeof initialCategoryStats;
      if (category && initialCategoryStats[category]) {
        initialCategoryStats[category].total++;
        initialCategoryStats[category].points += challenge.points || 0;
      }
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

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer();
  }, [startTimer]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  }, [timeElapsed, stopTimer]);

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