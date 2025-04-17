export type GameDifficulty = 'easy' | 'medium' | 'hard';

export type ActiveCategory = 'all' | 'basics' | 'algorithms' | 'challenges' | 'competitions';
export type SortOption = 'newest' | 'popular' | 'difficulty' | 'xp';

export interface Game {
  _id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: GameDifficulty;
  isLevelAvailable: boolean;
  requiredLevel: number;
  rewardPoints: number;
  completions: {
    count: number;
  };
  createdAt: string;
  gameData?: any[];
  estimatedTime?: number;
}

export interface GamesResponse {
  games: Game[];
}

export interface GameFilters {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
}
