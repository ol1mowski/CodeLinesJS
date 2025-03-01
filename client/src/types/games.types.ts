export type GameDifficulty = "easy" | "medium" | "hard";

export type Game = {
  _id: string;
  slug: string;
  id: string;
  rating: {
    average: number;
    count: number;
  };
  completions: {
    count: number;
  };
  title: string;
  rewardPoints: number;
  description: string;
  category: string;
  difficulty: GameDifficulty;
  completedCount: number;
  totalPlayers: number;
  thumbnailUrl: string;
  isCompleted: boolean;
  xpPoints: number;
}; 