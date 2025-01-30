export type LearningPath = {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  tags: string[];
};

export type Lesson = {
  title: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  isCompleted: boolean;
  progress: number;
  points: number;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "documentation" | "tutorial" | "article";
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isRecommended: boolean;
}; 