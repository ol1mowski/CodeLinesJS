import { Types } from 'mongoose';
import { Request } from 'express';

export interface IPost {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId | {
    _id: Types.ObjectId;
    username: string;
    avatar?: string;
    accountType: string;
  };
  comments: IComment[];
  likes: {
    count: number;
    userIds: Types.ObjectId[];
    isLiked?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  title?: string;
  isPublished: boolean;
}

export interface IComment {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId | {
    _id: Types.ObjectId;
    username: string;
    avatar?: string;
  };
  createdAt: Date;
}

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  likedPosts: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
  postsCount: number;
  avatar?: string;
  accountType: string;
}

export interface PostQuery {
  isPublished?: boolean;
  category?: string;
  author?: Types.ObjectId;
  $or?: Array<{
    title?: { $regex: string; $options: string };
    content?: { $regex: string; $options: string };
  }>;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: Record<string, number>;
  populate?: Array<{
    path: string;
    select?: string;
  }>;
}

export interface PostResponse {
  _id: Types.ObjectId;
  content: string;
  author: {
    _id: Types.ObjectId;
    username: string;
    avatar?: string;
    accountType?: string;
  };
  comments: IComment[];
  commentsCount: number;
  likes: {
    count: number;
    isLiked: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
  isSaved: boolean;
  title?: string;
  category?: string;
}

export interface PostsResponse {
  posts: PostResponse[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

export interface AuthRequest extends Request {
  user: {
    id: string;
    userId: string;
    email: string;
    role: string;
    username?: string;
    accountType?: string;
    [key: string]: any;
  };
} 