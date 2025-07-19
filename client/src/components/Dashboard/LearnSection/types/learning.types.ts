export type LearningPath = {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  isLocked: boolean;
  requiredLevel: number;
  progress?: {
    completed: number | any[];
    total: number;
    percentage: number;
  };
  outcomes?: string[];
  requirements?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
};

export type Lesson = {
  title: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  isCompleted: boolean;
  progress: number;
  points: number;
};

export type Resource = {
  data: {
    id: string;
    title: string;
    description: string;
    url: string;
    type: 'documentation' | 'tutorial' | 'article';
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    isRecommended: boolean;
  };
};
