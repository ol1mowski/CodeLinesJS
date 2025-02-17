import { useState, useCallback } from 'react';
import { GameplayStats, GameplayControls } from '../types/gameplay.types';

export const useGameplay = () => {
  const [stats, setStats] = useState<GameplayStats>({
    timeElapsed: 0,
    score: 0,
    lives: 3,
    currentLevel: 1,
  });

  const [controls, setControls] = useState<GameplayControls>({
    isPaused: false,
    isFullscreen: false,
    volume: 0.8,
  });

  const togglePause = useCallback(() => {
    setControls(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    setControls(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
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
      updateVolume,
    },
  };
}; 