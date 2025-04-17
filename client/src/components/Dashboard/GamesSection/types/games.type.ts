export type Game = {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ isPaused?: boolean }>;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'fundamentals' | 'syntax' | 'async' | 'regex';
};

export type GameContent = {
  title: string;
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
  gameData: any[]; // Można uściślić typ w zależności od gry
  estimatedTime: number;
  isCompleted: boolean;
};
