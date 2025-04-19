import { Document, Types } from 'mongoose';
import { Request } from 'express';

export type ReportStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

export type ReportCategory = 'bug' | 'feature' | 'performance' | 'security' | 'other';

export interface IReport {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: ReportCategory;
  email: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IReportDocument extends Omit<Document, '_id'>, IReport {}

export interface CreateReportDTO {
  title: string;
  description: string;
  category?: ReportCategory;
  email: string;
}

export interface UpdateReportStatusDTO {
  status: ReportStatus;
}

export interface ReportFilterOptions {
  category?: ReportCategory;
  status?: ReportStatus;
  page?: number;
  limit?: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ReportsListResponse {
  reports: IReport[];
  pagination: Pagination;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email: string;
    username?: string;
    accountType?: string;
    [key: string]: any;
  };
}

export interface EmailConfirmation {
  success: boolean;
  messageId?: string;
  previewUrl?: string;
  error?: string;
}

export interface ReportCreationResponse {
  id: Types.ObjectId;
  title: string;
  category: ReportCategory;
  status: ReportStatus;
  createdAt: Date;
} 