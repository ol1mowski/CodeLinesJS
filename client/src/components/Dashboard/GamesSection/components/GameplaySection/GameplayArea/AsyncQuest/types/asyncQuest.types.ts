export type AsyncChallenge = {
  id: string;
  title: string;
  description: string;
  code: string;
  correct: string;
  error: string;
  category: 'promises' | 'async-await' | 'callbacks';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  task: string;
};

export type GameStats = {
  score: number;
  timeElapsed: number;
  currentLevel: number;
  totalLevels: number;
  maxTime: number;
  challenges?: AsyncChallenge[];
  correctAnswers: number;
  categoryStats: {
    'promises': { total: number; points: number; correct: number };
    'async-await': { total: number; points: number; correct: number };
    'callbacks': { total: number; points: number; correct: number };
  };
}; 