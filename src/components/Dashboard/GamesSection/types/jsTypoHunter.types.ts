export type CodeChallenge = {
  id: number;
  code: string;
  error: string;
  correct: string;
  hint?: string;
  explanation?: string;
  category: 'syntax' | 'naming' | 'logic';
  difficulty: 'easy' | 'medium' | 'hard';
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
  correctAnswers: number;
} 