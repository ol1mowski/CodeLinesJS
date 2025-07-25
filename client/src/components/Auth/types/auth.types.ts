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

export type AuthState = {
  isAuthenticated: boolean;
  isAuthChecking: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

export type AuthActions = {
  logout: () => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  register: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: (credentialResponse: any, rememberMe?: boolean) => Promise<void>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<string>;
};

export type AuthStateAndActions = AuthState & AuthActions;

export type AuthStateContext = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: User | null;
}; 