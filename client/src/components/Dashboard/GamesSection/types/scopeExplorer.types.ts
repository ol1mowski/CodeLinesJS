export type ScopeChallenge = {
  id: number;
  code: string;
  options: string[];
  correct: string;
  explanation?: string;
  points?: number;
  category: 'scope' | 'closure' | 'hoisting';
  difficulty: 'easy' | 'medium' | 'hard';
};

export type CategoryStats = {
  total: number;
  correct: number;
  points: number;
};

export type GameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
  correctAnswers: number;
  categoryStats: Record<'scope' | 'closure' | 'hoisting', CategoryStats>;
};
