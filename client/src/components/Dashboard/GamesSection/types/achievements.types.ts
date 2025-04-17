export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: 'speed' | 'accuracy' | 'streak' | 'master';
  condition: {
    type: 'time' | 'score' | 'streak' | 'category';
    value: number;
    category?: 'promises' | 'async-await' | 'callbacks';
  };
  reward: number;
  unlocked?: boolean;
};
