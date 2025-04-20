export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'documentation' | 'tutorial' | 'video';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isRecommended: boolean;
  author: {
    name: string;
    url: string;
  };
  isSaved: boolean;
  createdAt: string;
};
