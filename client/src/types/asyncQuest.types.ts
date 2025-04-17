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
