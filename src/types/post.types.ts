export type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};

export type Comment = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
}; 