import { Response, NextFunction } from 'express';
import { ReportService } from '../../../services/reports/report.service.js';
import { 
  AuthRequest, 
  CreateReportDTO, 
} from '../../../types/reports/index.js';


export const createReport = async (
  req: AuthRequest & { body: CreateReportDTO }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const reportData = req.body;
    
    const result = await ReportService.createReport(reportData);
    
    res.success({
      report: result.report,
      emailSent: result.emailSent.success,
      emailDetails: result.emailSent.success ? {
        messageId: result.emailSent.messageId,
        previewUrl: result.emailSent.previewUrl 
      } : {
        error: result.emailSent.error
      }
    }, 'Zgłoszenie zostało przyjęte', 201);
  } catch (error) {
    next(error);
  }
};