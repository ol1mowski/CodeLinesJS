export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'documentation' | 'tutorial';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRecommended: boolean;
  author?: string;
  duration?: string;
}; 