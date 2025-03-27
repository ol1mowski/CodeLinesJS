export type ApiResponse = {
  status: string;
  data: {
    games: Game[];
    pagination: PaginationData;
  };
};

export type PaginationData = {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
};

export type Game = {
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
  gameData: any[]; 
  isLevelAvailable: boolean;
  requiredLevel: number;
  isActive: boolean;
  category: string;
  estimatedTime: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}; 