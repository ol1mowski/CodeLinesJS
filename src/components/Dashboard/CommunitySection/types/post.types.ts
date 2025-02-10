export type Post = {
  _id: string;
  content: string;
  author: {
    username: string;
    avatar?: string;
  };
  createdAt: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  likes: number;
}; 