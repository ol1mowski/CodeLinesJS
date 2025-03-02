export type Post = {
  id: string;
  _id: string;
  author: {
    id: string;
    username: string;
    name: string;
    avatar?: string;
  };
  content: string;
  comments: Comment[];
  createdAt: Date;
  likes: {
    count: number;
    isLiked: boolean;
  };
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