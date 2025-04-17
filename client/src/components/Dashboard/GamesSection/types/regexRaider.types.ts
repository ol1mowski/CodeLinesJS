export type GameStats = {
  currentLevel: number;
  totalLevels: number;
  score: number;
  timeElapsed: number;
  maxTime: number;
  correctAnswers: number;
};

export type RegexChallenge = {
  id: number;
  text: string;
  task: string;
  correctRegex: string;
};

// Dodajemy typ dla danych z API
export type RegexRaiderGameData = RegexChallenge;
