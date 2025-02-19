export type Game = {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ isPaused: boolean }>;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'fundamentals' | 'syntax' | 'async';
};
                                                                                                            