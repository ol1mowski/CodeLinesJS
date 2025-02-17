import { useState, useCallback, useEffect, useRef } from 'react';
import { challenges } from '../data/challenges';
import { GameState, BugFinderActions } from '../types/bugFinder.types';

const FEEDBACK_DISPLAY_TIME = 3000; // 3 seconds

export const useBugFinder = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    timeElapsed: 0,
    score: 0,
    lives: 3,
    isGameOver: false,
    currentCode: challenges[0].code,
    showHint: false,
    currentHintIndex: 0,
    feedback: {
      type: null,
      message: ''
    }
  });

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          const currentChallenge = challenges[prev.currentLevel];
          const isTimeUp = prev.timeElapsed + 1 >= currentChallenge.timeLimit;

          if (isTimeUp) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            return {
              ...prev,
              timeElapsed: currentChallenge.timeLimit,
              lives: Math.max(0, prev.lives - 1),
              isGameOver: prev.lives <= 1,
              feedback: {
                type: 'error',
                message: `Czas minął! ${prev.lives > 1 ? `Pozostało żyć: ${prev.lives - 1}` : 'Koniec gry!'}`
              }
            };
          }

          return {
            ...prev,
            timeElapsed: prev.timeElapsed + 1
          };
        });
      }, 1000);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const updateCode = useCallback((newCode: string) => {
    setGameState(prev => ({
      ...prev,
      currentCode: newCode
    }));
  }, []);

  const hideFeedback = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      feedback: { type: null, message: '' }
    }));
  }, []);

  const checkSolution = useCallback(() => {
    const currentChallenge = challenges[gameState.currentLevel];
    const isCorrect = gameState.currentCode.trim() === currentChallenge.correctCode.trim();

    if (isCorrect) {
      const timeBonus = Math.max(0, currentChallenge.timeLimit - gameState.timeElapsed);
      const levelScore = currentChallenge.points + timeBonus;

      stopTimer();
      setGameState(prev => ({
        ...prev,
        score: prev.score + levelScore,
        feedback: {
          type: 'success',
          message: `Świetnie! Zdobywasz ${levelScore} punktów (w tym ${timeBonus} punktów za czas)`
        }
      }));

      setTimeout(hideFeedback, FEEDBACK_DISPLAY_TIME);

      setTimeout(() => {
        const nextLevel = gameState.currentLevel + 1;
        const isGameFinished = nextLevel >= challenges.length;

        setGameState(prev => ({
          ...prev,
          currentLevel: nextLevel,
          timeElapsed: 0,
          currentCode: isGameFinished ? '' : challenges[nextLevel].code,
          isGameOver: isGameFinished
        }));

        if (!isGameFinished) {
          startTimer();
        }
      }, FEEDBACK_DISPLAY_TIME + 500);
    } else {
      const newLives = Math.max(0, gameState.lives - 1);
      setGameState(prev => ({
        ...prev,
        lives: newLives,
        isGameOver: newLives === 0,
        feedback: {
          type: 'error',
          message: `Niestety, rozwiązanie nie jest poprawne. ${newLives > 0 ? `Pozostało żyć: ${newLives}` : 'Koniec gry!'}`
        }
      }));

      setTimeout(hideFeedback, FEEDBACK_DISPLAY_TIME);
    }
  }, [gameState.currentLevel, gameState.currentCode, gameState.timeElapsed, gameState.lives, startTimer, stopTimer, hideFeedback]);

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
    stopTimer();
    const currentChallenge = challenges[gameState.currentLevel];
    
    setGameState(prev => ({
      ...prev,
      currentCode: currentChallenge.code,
      showHint: false,
      currentHintIndex: 0,
      timeElapsed: 0
    }));

    startTimer();
  }, [gameState.currentLevel, startTimer, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (gameState.feedback.type === 'error' && gameState.timeElapsed >= currentChallenge.timeLimit) {
      setTimeout(hideFeedback, FEEDBACK_DISPLAY_TIME);
      
      if (!gameState.isGameOver) {
        setTimeout(() => {
          resetLevel();
        }, FEEDBACK_DISPLAY_TIME + 500);
      }
    }
  }, [gameState.feedback.type, gameState.timeElapsed, currentChallenge.timeLimit, gameState.isGameOver, hideFeedback, resetLevel]);

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