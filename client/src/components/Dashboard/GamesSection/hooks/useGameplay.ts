import { useState, useCallback } from 'react';
import { GameplayStats } from '../types/gameplay.types';

export const useGameplay = () => {
  const [stats, setStats] = useState<GameplayStats>({
    timeElapsed: 0,
    score: 0,
    lives: 3,
    currentLevel: 1,
  });

  const [controls, setControls] = useState({
    isPaused: false,
    isFullscreen: false,
    isHelpVisible: false,
  });

  const togglePause = useCallback(() => {
    setControls(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    setControls(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  }, []);

  const toggleHelp = useCallback(() => {
    setControls(prev => ({ ...prev, isHelpVisible: !prev.isHelpVisible }));
  }, []);

  const resetGame = useCallback(() => {
    setStats({
      timeElapsed: 0,
      score: 0,
      lives: 3,
      currentLevel: 1,
    });
    setControls(prev => ({ ...prev, isPaused: false }));
  }, []);

  const updateVolume = useCallback((volume: number) => {
    setControls(prev => ({ ...prev, volume }));
  }, []);

  return {
    stats,
    controls,
    actions: {
      togglePause,
      toggleFullscreen,
      toggleHelp,
      resetGame,
      updateVolume,
    },
  };
};
