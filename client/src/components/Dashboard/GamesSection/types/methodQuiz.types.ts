export type MethodQuizChallenge = {
  id: number;
  codeSnippet: string;
  missingMethod: string;
  options: string[];
  correct: string;
  explanation?: string;
  points?: number;
  category: 'array-methods' | 'string-methods' | 'object-methods' | 'dom-methods';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedOutput?: string;
  hint?: string;
  isCompleted: boolean;
  isLevelAvailable: boolean;
};

export type CategoryStat = {
  total: number;
  correct: number;
  points: number;
};

export type MethodQuizGameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
  correctAnswers: number;
  categoryStats: {
    'array-methods': CategoryStat;
    'string-methods': CategoryStat;
    'object-methods': CategoryStat;
    'dom-methods': CategoryStat;
  };
}; 