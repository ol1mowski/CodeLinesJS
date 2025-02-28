export type GameDifficulty = 'easy' | 'medium' | 'hard';

export type ActiveCategory = 'all' | 'basics' | 'algorithms' | 'challenges' | 'competitions';
export type SortOption = 'newest' | 'popular' | 'difficulty' | 'xp';

export interface Game {
  _id: string;
  title: string;
  description: string;
  difficulty: GameDifficulty;
  rewardPoints: number;
  completions: {
    count: number;
  };
  createdAt: string;
}

export interface GamesResponse {
  games: Game[];
}

export interface GameFilters {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
} 