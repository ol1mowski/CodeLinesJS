import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export interface AuthRequest extends Omit<Request, 'user'> {
  user: {
    userId: string;
    email: string;
    username?: string;
    role: string;
    accountType?: string;
    [key: string]: any;
  };
}

export interface MessageReaction {
  userId: Types.ObjectId | string;
  emoji: string;
  createdAt: Date;
}

export interface MessageReport {
  userId: Types.ObjectId | string;
  reason: string;
  createdAt: Date;
}

export interface MessageReadStatus {
  userId: Types.ObjectId | string;
  readAt: Date;
}

export interface MessageDocument {
  _id: Types.ObjectId;
  groupId: Types.ObjectId | string;
  author: {
    _id: Types.ObjectId | string;
    username: string;
    avatar?: string;
  } | Types.ObjectId | string;
  content: string;
  reactions?: MessageReaction[];
  reports?: MessageReport[];
  readBy: MessageReadStatus[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormattedReactions {
  summary: Array<{emoji: string, count: number}>;
  userReactions: string[];
}

export interface MessageWithUserInfo extends Omit<MessageDocument, 'reactions'> {
  isAuthor: boolean;
  reactions: FormattedReactions;
  hasReported: boolean;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface GetMessagesResponse {
  status: string;
  data: {
    messages: MessageWithUserInfo[];
    pagination: PaginationResponse;
  };
}

export interface SendMessageResponse {
  status: string;
  data: {
    message: MessageDocument;
  };
}

export interface MessageActionResponse {
  status: string;
  data?: any;
  message?: string;
}

export type MessageController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>; 