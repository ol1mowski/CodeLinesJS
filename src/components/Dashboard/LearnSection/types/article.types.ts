export type ArticleType = 'tutorial' | 'guide' | 'documentation';
export type ArticleDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  readTime: string;
  type: ArticleType;
  difficulty: ArticleDifficulty;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  tags: string[];
} 