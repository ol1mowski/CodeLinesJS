import { useState, useCallback, useEffect } from 'react';
import { challenges } from '../data/challenges';
import { GameState, BugFinderActions } from '../types/bugFinder.types';

export const useBugFinder = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    timeElapsed: 0,
    score: 0,
    lives: 3,
    isGameOver: false,
    currentCode: challenges[0].code,
    showHint: false,
    currentHintIndex: 0
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    const newTimer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);

    setTimer(newTimer);
  }, []);

  const stopTimer = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timer]);

  const updateCode = useCallback((newCode: string) => {
    setGameState(prev => ({
      ...prev,
      currentCode: newCode
    }));
  }, []);

  const checkSolution = useCallback(() => {
    const currentChallenge = challenges[gameState.currentLevel];
    const isCorrect = gameState.currentCode.trim() === currentChallenge.correctCode.trim();

    if (isCorrect) {
      const timeBonus = Math.max(0, currentChallenge.timeLimit - gameState.timeElapsed);
      const levelScore = currentChallenge.points + timeBonus;

      setGameState(prev => ({
        ...prev,
        score: prev.score + levelScore,
        currentLevel: prev.currentLevel + 1,
        timeElapsed: 0,
        currentCode: challenges[prev.currentLevel + 1]?.code || '',
        isGameOver: prev.currentLevel + 1 >= challenges.length
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        isGameOver: prev.lives <= 1
      }));
    }
  }, [gameState.currentLevel, gameState.currentCode, gameState.timeElapsed]);

  const showNextHint = useCallback(() => {
    const currentChallenge = challenges[gameState.currentLevel];
    
    if (gameState.currentHintIndex < currentChallenge.hints.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentHintIndex: prev.currentHintIndex + 1,
        showHint: true
      }));
    }
  }, [gameState.currentLevel, gameState.currentHintIndex]);

  const resetLevel = useCallback(() => {
    const currentChallenge = challenges[gameState.currentLevel];
    
    setGameState(prev => ({
      ...prev,
      currentCode: currentChallenge.code,
      showHint: false,
      currentHintIndex: 0
    }));
  }, [gameState.currentLevel]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  return {
    gameState,
    currentChallenge: challenges[gameState.currentLevel],
    actions: {
      updateCode,
      checkSolution,
      showNextHint,
      resetLevel
    }
  };
}; 