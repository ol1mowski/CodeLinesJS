export interface DashboardStats {
  level: number;
  points: number;
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
  username: string;
  avatar: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats;
  profile: DashboardProfile;
  notifications: DashboardNotification[];
  unreadCount: number;
} 