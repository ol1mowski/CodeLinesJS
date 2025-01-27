export type LearningPath = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
}; 