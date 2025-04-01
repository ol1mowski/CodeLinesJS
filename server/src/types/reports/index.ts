import { Document, Types } from 'mongoose';
import { Request } from 'express';

/**
 * Statusy zgłoszeń
 */
export type ReportStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

/**
 * Kategorie zgłoszeń
 */
export type ReportCategory = 'bug' | 'feature' | 'performance' | 'security' | 'other';

/**
 * Podstawowy interfejs reprezentujący dane zgłoszenia
 */
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

/**
 * Interfejs modelu zgłoszenia
 */
export interface IReportDocument extends Omit<Document, '_id'>, IReport {}

/**
 * Typ dla danych wejściowych przy tworzeniu zgłoszenia
 */
export interface CreateReportDTO {
  title: string;
  description: string;
  category?: ReportCategory;
  email: string;
}

/**
 * Typ dla danych wejściowych przy aktualizacji statusu zgłoszenia
 */
export interface UpdateReportStatusDTO {
  status: ReportStatus;
}

/**
 * Typ dla opcji filtrowania zgłoszeń
 */
export interface ReportFilterOptions {
  category?: ReportCategory;
  status?: ReportStatus;
  page?: number;
  limit?: number;
}

/**
 * Typ dla paginacji
 */
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Typ dla odpowiedzi z listą zgłoszeń
 */
export interface ReportsListResponse {
  reports: IReport[];
  pagination: Pagination;
}

/**
 * Rozszerzenie interfejsu Request o typowanie dla roli użytkownika
 */
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

/**
 * Typ dla odpowiedzi z potwierdzeniem wysłania emaila
 */
export interface EmailConfirmation {
  success: boolean;
  messageId?: string;
  previewUrl?: string;
  error?: string;
}

/**
 * Typ dla odpowiedzi po utworzeniu zgłoszenia
 */
export interface ReportCreationResponse {
  id: Types.ObjectId;
  title: string;
  category: ReportCategory;
  status: ReportStatus;
  createdAt: Date;
} 