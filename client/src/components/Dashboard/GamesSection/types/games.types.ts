export type GameDifficulty = 'easy' | 'medium' | 'hard';
export type SortOption = 'newest' | 'popular' | 'difficulty' | 'xp';

export type Game = {
  _id: string;
  slug: string;
  id: string;
  isLevelAvailable: boolean;
  requiredLevel: number;
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
  thumbnailUrl: string;
  isCompleted: boolean;
  xpPoints: number;
  createdAt?: string;
  gameData?: any[];
  estimatedTime?: number;
};

export interface GamesResponse {
  games: Game[];
}

export interface GameFilters {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
}
