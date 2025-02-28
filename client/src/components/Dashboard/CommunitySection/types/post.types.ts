export type Post = {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  isLiked: boolean;
  likes: {
    count: number;
  };
  comments: Comment[];
  likesCount: number;
  commentsCount: number;
}; 