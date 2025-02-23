export type Post = {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  likesCount: number;
  commentsCount: number;
}; 