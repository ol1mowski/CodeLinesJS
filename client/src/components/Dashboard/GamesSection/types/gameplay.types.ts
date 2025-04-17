export interface GameplayStats {
  timeElapsed: number;
  score: number;
  lives: number;
  currentLevel: number;
}

export type GameDifficulty = 'easy' | 'medium' | 'hard';
