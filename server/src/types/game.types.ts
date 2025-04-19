import { Document, Types } from 'mongoose';

export type GameDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type GameCategory =
  | 'basics'
  | 'challenges'
  | 'algorithms'
  | 'syntax'
  | 'variables'
  | 'async'
  | 'debugging'
  | 'regex';

export interface GameData {
  [key: string]: any;
}

export interface IGame extends Document {
  title: string;
  slug: string;
  description: string;
  difficulty: GameDifficulty;
  requiredLevel: number;
  rating: {
    average: number;
    count: number;
    total: number;
  };
  completions: {
    count: number;
    users: Types.ObjectId[];
  };
  rewardPoints: number;
  gameData: GameData[];
  isActive: boolean;
  category: GameCategory;
  estimatedTime: number;
  createdAt: Date;
  updatedAt: Date;
  updateRating: (newRating: number) => void;
}

export interface GameQuery {
  difficulty?: GameDifficulty;
  category?: GameCategory;
  isActive?: boolean;
  slug?: string;
  [key: string]: any;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface GameWithUserInfo {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  difficulty: GameDifficulty;
  requiredLevel: number;
  rating: {
    average: number;
    count: number;
    total: number;
  };
  completions: {
    count: number;
    users: Types.ObjectId[];
  };
  rewardPoints: number;
  gameData: GameData[];
  isActive: boolean;
  category: GameCategory;
  estimatedTime: number;
  isCompleted: boolean;
  isLevelAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GamesResponse {
  games: GameWithUserInfo[];
  pagination: Pagination;
}

export interface GameResponse {
  game: GameWithUserInfo;
}

export interface SortOptions {
  [key: string]: 1 | -1;
}
