import { useState, useCallback, useEffect, useRef } from 'react';
import { challenges } from '../data/challenges';
import { GameState } from '../types/bugFinder.types';
import { FaStar } from 'react-icons/fa';

const FEEDBACK_DISPLAY_TIME = 3000;
const LEVEL_TRANSITION_DELAY = 2000;

export type BugFinderActions = {
  updateCode: (code: string) => void;
  checkSolution: () => void;
  showNextHint: () => void;
  resetLevel: () => void;
  hideFeedback: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

export const useBugFinder = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    timeElapsed: 0,
    score: 0,
    lives: 3,
    isGameOver: false,
    showGameSummary: false,
    currentCode: challenges[0].code,
    showHint: false,
    currentHintIndex: 0,
    feedback: {
      type: null,
      message: ''
    }
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentChallenge = challenges[gameState.currentLevel];

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          const challenge = challenges[prev.currentLevel];
          const isTimeUp = prev.timeElapsed + 1 >= challenge.timeLimit;

          if (isTimeUp) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            return {
              ...prev,
              timeElapsed: challenge.timeLimit,
              isGameOver: true,
              feedback: {
                type: 'error',
                message: 'Koniec czasu! Nie udało się rozwiązać zadania w wyznaczonym czasie.'
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
      currentCode: newCode.replace(/\u200B/g, '')
    }));
  }, []);

  const hideFeedback = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      feedback: { type: null, message: '' }
    }));
  }, []);

  const finishGame = useCallback(() => {
    stopTimer();
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      showGameSummary: true,
      feedback: {
        type: null,
        message: ''
      }
    }));
  }, [stopTimer]);

  const resetGame = useCallback(() => {
    stopTimer();
    setGameState({
      currentLevel: 0,
      timeElapsed: 0,
      score: 0,
      lives: 3,
      isGameOver: false,
      showGameSummary: false,
      currentCode: challenges[0].code,
      showHint: false,
      currentHintIndex: 0,
      feedback: {
        type: null,
        message: ''
      }
    });
    startTimer();
  }, [stopTimer, startTimer]);

  const checkSolution = useCallback(() => {
    if (gameState.isGameOver) {
      finishGame();
      return;
    }

    const currentChallenge = challenges[gameState.currentLevel];
    
    const normalizeCode = (code: string) => {
      return code
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\r\n/g, '\n');
    };

    const isCorrect = normalizeCode(gameState.currentCode) === normalizeCode(currentChallenge.correctCode);

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

      setTimeout(() => {
        const nextLevel = gameState.currentLevel + 1;
        const isGameFinished = nextLevel >= challenges.length;

        if (isGameFinished) {
          setGameState(prev => ({
            ...prev,
            isGameOver: true,
            feedback: {
              type: 'success',
              message: 'Gratulacje! Ukończyłeś wszystkie poziomy!'
            }
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentLevel: nextLevel,
            timeElapsed: 0,
            currentCode: challenges[nextLevel].code,
            feedback: { type: null, message: '' }
          }));
          startTimer();
        }
      }, LEVEL_TRANSITION_DELAY);
    } else {
      const newLives = gameState.lives - 1;
      setGameState(prev => ({
        ...prev,
        lives: newLives,
        isGameOver: newLives === 0,
        feedback: {
          type: 'error',
          message: newLives === 0 
            ? 'Koniec gry! Nie pozostało więcej żyć. Kliknij ponownie, aby zobaczyć poprawne rozwiązanie.'
            : `Niestety, rozwiązanie nie jest poprawne. Pozostało żyć: ${newLives}`
        }
      }));

      if (newLives === 0) {
        stopTimer();
      }

      setTimeout(hideFeedback, FEEDBACK_DISPLAY_TIME);
    }
  }, [gameState.isGameOver, finishGame, gameState.currentLevel, gameState.currentCode, gameState.timeElapsed, gameState.lives, startTimer, stopTimer, hideFeedback]);

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
    currentChallenge,
    actions: {
      updateCode,
      checkSolution,
      showNextHint,
      resetLevel,
      hideFeedback,
      finishGame,
      resetGame
    }
  };
}; 