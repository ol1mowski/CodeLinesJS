export type RewardType = 'xp' | 'badge' | 'achievement';

export type Reward = {
  type: RewardType;
  value: number;
  title: string;
  description: string;
  icon?: string;
}

export type LessonReward = {
  completion: Reward[];
  quiz: {
    [score: number]: Reward[];
  };
} 