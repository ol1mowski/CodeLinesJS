import { IconType } from 'react-icons';

export type Challenge = {
  title: string;
  description: string;
  icon: IconType;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
};

export type ChallengeCardProps = Challenge; 