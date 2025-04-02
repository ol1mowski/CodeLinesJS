import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createReport } from '../../../../src/api/controllers/reports/report.controller.js';
import { ReportService } from '../../../../src/services/reports/report.service.js';
import { NextFunction, Response } from 'express';
import { AuthRequest, CreateReportDTO, ReportCategory, ReportStatus } from '../../../../src/types/reports/index.js';
import { Types } from 'mongoose';

vi.mock('../../../../src/services/reports/report.service.js', () => ({
  ReportService: {
    createReport: vi.fn()
  }
}));

describe('createReport controller', () => {
  let req: Partial<AuthRequest & { body: CreateReportDTO }>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      body: {
        title: 'Test Report',
        description: 'Test Description',
        category: 'bug' as ReportCategory,
        email: 'test@example.com'
      },
      user: {
        userId: 'user123',
        role: 'user',
        email: 'user@example.com'
      }
    };
    
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should create a report and return success response with status 201', async () => {
    const mockReportId = new Types.ObjectId();
    const mockReportResponse = {
      report: {
        id: mockReportId,
        title: 'Test Report',
        category: 'bug' as ReportCategory,
        status: 'new' as ReportStatus,
        createdAt: new Date()
      },
      emailSent: {
        success: true,
        messageId: 'test-message-id',
        previewUrl: 'http://test-preview-url'
      }
    };
    
    vi.mocked(ReportService.createReport).mockResolvedValue(mockReportResponse);
    
    await createReport(req as AuthRequest & { body: CreateReportDTO }, res as Response, next);
    
    expect(ReportService.createReport).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Zgłoszenie zostało przyjęte',
      report: mockReportResponse.report,
      emailSent: true,
      emailDetails: {
        messageId: 'test-message-id',
        previewUrl: 'http://test-preview-url'
      }
    });
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should include error details when email fails to send', async () => {
    const mockReportId = new Types.ObjectId();
    const mockReportResponse = {
      report: {
        id: mockReportId,
        title: 'Test Report',
        category: 'bug' as ReportCategory,
        status: 'new' as ReportStatus,
        createdAt: new Date()
      },
      emailSent: {
        success: false,
        error: 'Failed to send email'
      }
    };
    
    vi.mocked(ReportService.createReport).mockResolvedValue(mockReportResponse);
    
    await createReport(req as AuthRequest & { body: CreateReportDTO }, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Zgłoszenie zostało przyjęte',
      report: mockReportResponse.report,
      emailSent: false,
      emailDetails: {
        error: 'Failed to send email'
      }
    });
  });
  
  it('should call next with error when service throws an exception', async () => {
    const mockError = new Error('Service error');
    vi.mocked(ReportService.createReport).mockRejectedValue(mockError);
    
    await createReport(req as AuthRequest & { body: CreateReportDTO }, res as Response, next);
    
    expect(ReportService.createReport).toHaveBeenCalledWith(req.body);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 