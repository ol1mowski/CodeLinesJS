export type LearningPath = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredLevel: number;
  estimatedTime: number;
  lessons: Array<{
    id: string;
    title: string;
  }>;
  outcomes: string[];
  requirements: string[];
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  isLocked: boolean;
}; 