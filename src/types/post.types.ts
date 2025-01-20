export type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: string[];
  commentsCount: number;
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