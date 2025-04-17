export type User = {
  id: string;
  _id?: string; // MongoDB ID
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: {
    bio?: string;
    avatar?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  stats?: {
    points?: number;
    completedChallenges?: number;
    averageScore?: number;
    totalTimeSpent?: number;
  };
  settings?: {
    theme?: 'light' | 'dark';
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    language?: 'pl' | 'en';
  };
};
