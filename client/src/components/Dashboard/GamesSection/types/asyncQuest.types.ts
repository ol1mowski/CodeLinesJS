export type AsyncChallenge = {
  id: number;
  title: string;
  description: string;
  task: string;
  code: string;
  error: string;
  correct: string;
  points: number;
  category: 'promises' | 'async-await' | 'callbacks';
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
  correctAnswers: number;
  categoryStats: {
    promises: { total: number; correct: number; points: number };
    'async-await': { total: number; correct: number; points: number };
    callbacks: { total: number; correct: number; points: number };
  };
}; 