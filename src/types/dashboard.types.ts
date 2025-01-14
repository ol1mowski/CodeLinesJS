export interface DashboardStats {
  completedChallenges: number;
  totalPoints: number;
  streak: number;
  lastActive: string;
}

export interface DashboardProfile {
  username: string;
  avatar?: string;
  theme: 'light' | 'dark';
}

export interface DashboardNotification {
  _id: string;
  message: string;
  type: 'challenge' | 'achievement' | 'system' | 'social';
  read: boolean;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  profile: DashboardProfile;
  notifications: DashboardNotification[];
  unreadCount: number;
} 