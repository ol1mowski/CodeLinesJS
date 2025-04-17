export type QuizChallenge = {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation?: string;
  points?: number;
  category: 'basics' | 'advanced' | 'frameworks';
  difficulty: 'easy' | 'medium' | 'hard';
};

export type CategoryStat = {
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
  categoryStats: {
    basics: CategoryStat;
    advanced: CategoryStat;
    frameworks: CategoryStat;
  };
};
