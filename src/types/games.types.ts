export type GameDifficulty = "easy" | "medium" | "hard";

export type Game = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: GameDifficulty;
  completedCount: number;
  totalPlayers: number;
  thumbnailUrl: string;
  isCompleted: boolean;
  xpPoints: number;
}; 