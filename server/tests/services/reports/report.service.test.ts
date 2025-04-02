import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Types } from 'mongoose';
import { ReportService } from '../../../src/services/reports/report.service.js';
import { Report } from '../../../src/models/report.model.js';
import * as emailService from '../../../src/services/email.service.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { 
  CreateReportDTO, 
  ReportStatus, 
  ReportCategory,
  ReportFilterOptions,
} from '../../../src/types/reports/index.js';

vi.mock('../../../src/models/report.model.js', () => ({
  Report: {
    find: vi.fn(() => ({
      sort: vi.fn(() => ({
        skip: vi.fn(() => ({
          limit: vi.fn(() => ({
            lean: vi.fn()
          }))
        }))
      }))
    })),
    findById: vi.fn(() => ({
      lean: vi.fn()
    })),
    findByIdAndUpdate: vi.fn(() => ({
      lean: vi.fn()
    })),
    countDocuments: vi.fn()
  }
}));

// Create a constructor mock
const mockSave = vi.fn();
vi.mock('../../../src/models/report.model.js', async () => {
  const actual = await vi.importActual('../../../src/models/report.model.js');
  return {
    ...actual,
    Report: function() {
      return {
        save: mockSave
      };
    }
  };
});

// Mock email service
vi.mock('../../../src/services/email.service.js', () => ({
  sendBugReportConfirmation: vi.fn(),
  sendReportStatusUpdate: vi.fn()
}));

describe('ReportService', () => {
  let mockReport: any;
  let mockReportData: CreateReportDTO;
  let mockReportId: string;
  
  beforeEach(() => {
    mockReportId = new Types.ObjectId().toString();
    
    mockReportData = {
      title: 'Test Bug Report',
      description: 'This is a test bug report',
      category: 'bug' as ReportCategory,
      email: 'test@example.com'
    };
    
    mockReport = {
      _id: new Types.ObjectId(mockReportId),
      title: 'Test Bug Report',
      description: 'This is a test bug report',
      category: 'bug',
      email: 'test@example.com',
      status: 'new',
      createdAt: new Date()
    };
    
    mockSave.mockResolvedValue(mockReport);
    
    vi.mocked(emailService.sendBugReportConfirmation).mockResolvedValue({
      success: true,
      messageId: 'test-message-id',
      previewUrl: 'https://preview.url'
    });
    
    vi.mocked(emailService.sendReportStatusUpdate).mockResolvedValue({
      success: true,
      messageId: 'test-status-update-id',
      previewUrl: 'https://status-update-preview.url'
    });
    
    vi.clearAllMocks();
  });
  
  describe('createReport', () => {
    it('should create a new report and send email confirmation', async () => {
      mockSave.mockResolvedValueOnce(mockReport);
      
      const result = await ReportService.createReport(mockReportData);
      
      expect(result).toEqual({
        report: {
          id: expect.any(Types.ObjectId),
          title: mockReportData.title,
          category: mockReportData.category,
          status: 'new',
          createdAt: expect.any(Date)
        },
        emailSent: {
          success: true,
          messageId: 'test-message-id',
          previewUrl: 'https://preview.url'
        }
      });
      
      expect(emailService.sendBugReportConfirmation).toHaveBeenCalledWith(
        mockReportData.email,
        mockReportData.title
      );
    });
    
    it('should throw ValidationError when required fields are missing', async () => {
      const invalidData = { 
        title: '', 
        description: 'Missing title',
        email: 'test@example.com'
      };
      
      await expect(ReportService.createReport(invalidData as CreateReportDTO))
        .rejects.toThrow(ValidationError);
    });
    
    it('should throw ValidationError when email is invalid', async () => {
      const invalidData = { 
        title: 'Test',
        description: 'Test description',
        email: 'invalid-email'
      };
      
      await expect(ReportService.createReport(invalidData as CreateReportDTO))
        .rejects.toThrow(ValidationError);
    });
    
    it('should use default category when none provided', async () => {
      const dataWithoutCategory = { 
        title: 'Test',
        description: 'Test description',
        email: 'test@example.com'
      };
      
      await ReportService.createReport(dataWithoutCategory as CreateReportDTO);
      
      expect(mockSave).toHaveBeenCalled();
    });
  });
  
  describe('getReports', () => {
    it('should return reports list with pagination', async () => {
      const mockReports = [
        {
          _id: new Types.ObjectId(),
          title: 'Report 1',
          description: 'Description 1',
          category: 'bug',
          email: 'user1@example.com',
          status: 'new',
          createdAt: new Date()
        },
        {
          _id: new Types.ObjectId(),
          title: 'Report 2',
          description: 'Description 2',
          category: 'feature',
          email: 'user2@example.com',
          status: 'in_progress',
          createdAt: new Date()
        }
      ];
      
      const mockFilterOptions: ReportFilterOptions = {
        category: 'bug',
        status: 'new',
        page: 1,
        limit: 10
      };
      
      const findMock = vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          skip: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              lean: vi.fn().mockResolvedValue(mockReports)
            })
          })
        })
      });
      
      Report.find = findMock;
      Report.countDocuments = vi.fn().mockResolvedValue(2);
      
      const result = await ReportService.getReports('admin', mockFilterOptions);
      
      expect(result).toEqual({
        reports: mockReports,
        pagination: {
          total: 2,
          page: 1,
          limit: 10,
          pages: 1
        }
      });
      
      expect(findMock).toHaveBeenCalledWith({
        category: 'bug',
        status: 'new'
      });
    });
    
    it('should throw ValidationError when user is not admin', async () => {
      const mockFilterOptions: ReportFilterOptions = {
        page: 1,
        limit: 10
      };
      
      await expect(ReportService.getReports('user', mockFilterOptions))
        .rejects.toThrow(ValidationError);
    });
  });
  
  describe('getReportById', () => {
    it('should return a report by id', async () => {
      const findByIdMock = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockReport)
      });
      
      Report.findById = findByIdMock;
      
      const result = await ReportService.getReportById(mockReportId, 'admin');
      
      expect(result).toEqual(mockReport);
      expect(findByIdMock).toHaveBeenCalledWith(mockReportId);
    });
    
    it('should throw ValidationError when report not found', async () => {
      const findByIdMock = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      });
      
      Report.findById = findByIdMock;
      
      await expect(ReportService.getReportById(mockReportId, 'admin'))
        .rejects.toThrow(ValidationError);
    });
    
    it('should throw ValidationError when user is not admin', async () => {
      await expect(ReportService.getReportById(mockReportId, 'user'))
        .rejects.toThrow(ValidationError);
    });
  });
  
  describe('updateReportStatus', () => {
    it('should update report status', async () => {
      const updatedReport = {
        ...mockReport,
        status: 'in_progress',
        updatedAt: new Date()
      };
      
      const findByIdAndUpdateMock = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(updatedReport)
      });
      
      Report.findByIdAndUpdate = findByIdAndUpdateMock;
      
      const result = await ReportService.updateReportStatus(mockReportId, 'in_progress', 'admin');
      
      expect(result).toEqual(updatedReport);
      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        mockReportId,
        {
          status: 'in_progress',
          updatedAt: expect.any(Date)
        },
        { new: true, runValidators: true }
      );
      expect(emailService.sendReportStatusUpdate).toHaveBeenCalledWith(
        updatedReport.email,
        updatedReport.title,
        'in_progress'
      );
    });
    
    it('should throw ValidationError when report not found', async () => {
      const findByIdAndUpdateMock = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      });
      
      Report.findByIdAndUpdate = findByIdAndUpdateMock;
      
      await expect(ReportService.updateReportStatus(mockReportId, 'in_progress', 'admin'))
        .rejects.toThrow(ValidationError);
    });
    
    it('should throw ValidationError when status is invalid', async () => {
      await expect(ReportService.updateReportStatus(mockReportId, 'invalid' as ReportStatus, 'admin'))
        .rejects.toThrow(ValidationError);
    });
    
    it('should throw ValidationError when user is not admin', async () => {
      await expect(ReportService.updateReportStatus(mockReportId, 'in_progress', 'user'))
        .rejects.toThrow(ValidationError);
    });
    
    it('should not send email when status is new', async () => {
      const updatedReport = {
        ...mockReport,
        status: 'new',
        updatedAt: new Date()
      };
      
      const findByIdAndUpdateMock = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(updatedReport)
      });
      
      Report.findByIdAndUpdate = findByIdAndUpdateMock;
      
      await ReportService.updateReportStatus(mockReportId, 'new', 'admin');
      
      expect(emailService.sendReportStatusUpdate).not.toHaveBeenCalled();
    });
  });
}); 