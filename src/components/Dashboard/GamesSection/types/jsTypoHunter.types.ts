export type CodeChallenge = {
  id: number;
  code: string;
  error: string;
  correct: string;
}

export type GameState = {
  currentLevel: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
  isGameOver: boolean;
}

export type GameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
} 