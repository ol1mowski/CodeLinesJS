export interface GameplayStats {
  timeElapsed: number;
  score: number;
  lives: number;
  currentLevel: number;
}

export interface GameplayControls {
  isPaused: boolean;
  isFullscreen: boolean;
  volume: number;
}

export type GameDifficulty = 'easy' | 'medium' | 'hard'; 