import { Report } from '../../models/report.model.js';
import { ValidationError } from '../../utils/errors.js';
import * as emailService from '../email.service.js';
import { 
  CreateReportDTO, 
  ReportStatus, 
  ReportCategory, 
  IReportDocument,
  IReport,
  ReportFilterOptions, 
  ReportsListResponse,
  EmailConfirmation,
  ReportCreationResponse
} from '../../types/reports/index.js';
import { Types } from 'mongoose';

/**
 * Serwis obsługujący zgłoszenia
 */
export class ReportService {
  /**
   * Lista dozwolonych statusów zgłoszeń
   */
  private static readonly VALID_STATUSES: ReportStatus[] = ['new', 'in_progress', 'resolved', 'closed'];

  /**
   * Lista dozwolonych kategorii zgłoszeń
   */
  private static readonly VALID_CATEGORIES: ReportCategory[] = ['bug', 'feature', 'performance', 'security', 'other'];

  /**
   * Walidacja adresu email
   * @param email Adres email do zwalidowania
   * @returns true jeśli email jest poprawny, false w przeciwnym wypadku
   */
  private static validateEmail(email: string): boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  /**
   * Sprawdza czy użytkownik ma uprawnienia administratora
   * @param role Rola użytkownika
   * @throws ValidationError jeśli użytkownik nie ma uprawnień administratora
   */
  private static validateAdminAccess(role?: string): void {
    if (!role || role !== 'admin') {
      throw new ValidationError('Brak uprawnień do wykonania tej operacji');
    }
  }

  /**
   * Tworzy nowe zgłoszenie
   * @param reportData Dane zgłoszenia
   * @returns Informacje o utworzonym zgłoszeniu i wyniku wysłania emaila
   */
  public static async createReport(reportData: CreateReportDTO): Promise<{
    report: ReportCreationResponse;
    emailSent: EmailConfirmation;
  }> {
    const { title, description, category, email } = reportData;

    if (!title || !description || !email) {
      throw new ValidationError('Brakujące wymagane pola: title, description, email');
    }
    
    if (!this.validateEmail(email)) {
      throw new ValidationError('Nieprawidłowy format adresu email');
    }

    const validCategory = category && this.VALID_CATEGORIES.includes(category) 
      ? category 
      : 'bug';

    const newReport = new Report({
      title,
      description,
      category: validCategory,
      email,
      status: 'new',
      createdAt: new Date()
    });

    const savedReport = await newReport.save();

    const emailResult = await emailService.sendBugReportConfirmation(email, title);
    
    return {
      report: {
        id: savedReport._id,
        title: savedReport.title,
        category: savedReport.category,
        status: savedReport.status,
        createdAt: savedReport.createdAt
      },
      emailSent: emailResult
    };
  }

  /**
   * Pobiera listę zgłoszeń z filtrowaniem i paginacją
   * @param userRole Rola użytkownika
   * @param options Opcje filtrowania i paginacji
   * @returns Lista zgłoszeń wraz z informacjami o paginacji
   */
  public static async getReports(userRole: string, options: ReportFilterOptions): Promise<ReportsListResponse> {
    this.validateAdminAccess(userRole);

    const { category, status, page = 1, limit = 10 } = options;
    const skip = (Number(page) - 1) * Number(limit);
    
    // Budowanie zapytania
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (status) query.status = status;

    // Pobieranie zgłoszeń z paginacją
    const [reports, total] = await Promise.all([
      Report.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Report.countDocuments(query)
    ]);

    return {
      reports: reports as unknown as IReport[],
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    };
  }

  /**
   * Pobiera pojedyncze zgłoszenie na podstawie ID
   * @param reportId ID zgłoszenia
   * @param userRole Rola użytkownika
   * @returns Zgłoszenie
   */
  public static async getReportById(reportId: string, userRole: string): Promise<IReport> {
    this.validateAdminAccess(userRole);

    const report = await Report.findById(reportId).lean();

    if (!report) {
      throw new ValidationError('Zgłoszenie nie zostało znalezione');
    }

    return report as unknown as IReport;
  }

  /**
   * Aktualizuje status zgłoszenia
   * @param reportId ID zgłoszenia
   * @param status Nowy status
   * @param userRole Rola użytkownika
   * @returns Zaktualizowane zgłoszenie
   */
  public static async updateReportStatus(
    reportId: string, 
    status: ReportStatus, 
    userRole: string
  ): Promise<IReport> {
    this.validateAdminAccess(userRole);

    // Walidacja statusu
    if (!status || !this.VALID_STATUSES.includes(status)) {
      throw new ValidationError('Nieprawidłowy status. Dozwolone wartości: new, in_progress, resolved, closed');
    }

    // Aktualizacja zgłoszenia
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedReport) {
      throw new ValidationError('Zgłoszenie nie zostało znalezione');
    }

    // Wysyłanie powiadomienia email o zmianie statusu
    if (status !== 'new') {
      await emailService.sendReportStatusUpdate(updatedReport.email, updatedReport.title, status);
    }

    return updatedReport as unknown as IReport;
  }
} 