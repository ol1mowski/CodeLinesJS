export interface Game {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: {
    average: number;
    count: number;
    total: number;
  };
  completions: {
    count: number;
    users: string[];
  };
  rewardPoints: number;
  isActive: boolean;
  category: string;
  estimatedTime: number;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface ApiResponse {
  status: string;
  data: {
    games: Game[];
    pagination: PaginationData;
  };
} 