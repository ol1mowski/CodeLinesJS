export type ScopeChallenge = {
  id: number;
  code: string;
  options: string[];
  correct: string;
  explanation?: string;
  points?: number;
};

export type GameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
}; 