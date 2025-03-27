export type Post = {
  _id: string;
  id?: string;
  content: string;
  author: {
    _id: string;
    id?: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  createdAt: string | Date;
  isLiked: boolean;
  likes: {
    count: number;
    isLiked?: boolean;
  };
  comments: Comment[];
  likesCount?: number;
  commentsCount: number;
};

export type Comment = {
  _id: string;
  id?: string;
  author: {
    name: string;
    id?: string;
    _id?: string;
  };
  content: string;
  createdAt: string | Date;
}; 