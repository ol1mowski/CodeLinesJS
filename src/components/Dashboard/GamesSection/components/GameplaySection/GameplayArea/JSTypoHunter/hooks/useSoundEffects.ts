import { useCallback } from 'react';

const SUCCESS_SOUND = '/sounds/success.mp3';
const ERROR_SOUND = '/sounds/error.mp3';
const LEVEL_COMPLETE_SOUND = '/sounds/level-complete.mp3';

export const useSoundEffects = () => {
  const playSound = useCallback((soundUrl: string) => {
    const audio = new Audio(soundUrl);
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignoruj błędy odtwarzania (np. gdy przeglądarka blokuje autoplay)
    });
  }, []);

  return {
    playSuccessSound: () => playSound(SUCCESS_SOUND),
    playErrorSound: () => playSound(ERROR_SOUND),
    playLevelCompleteSound: () => playSound(LEVEL_COMPLETE_SOUND),
  };
}; 