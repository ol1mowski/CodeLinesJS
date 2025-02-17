export type CodeChallenge = {
  id: number;
  code: string;
  correctCode: string;
  hints: string[];
  errors: {
    line: number;
    message: string;
  }[];
  timeLimit: number;
  points: number;
}

export type GameState = {
  currentLevel: number;
  timeElapsed: number;
  score: number;
  lives: number;
  isGameOver: boolean;
  currentCode: string;
  showHint: boolean;
  currentHintIndex: number;
}

export type BugFinderActions = {
  updateCode: (code: string) => void;
  checkSolution: () => void;
  showNextHint: () => void;
  resetLevel: () => void;
} 