import { Report } from '../../../models/report.model.js';
import { ValidationError } from '../../../utils/errors.js';
import * as emailService from '../../../services/email.service.js';

export const createReport = async (req, res, next) => {
  try {
    const { title, description, category, email } = req.body;

    if (!title || !description || !email) {
      throw new ValidationError('Brakujące wymagane pola: title, description, email');
    }
    
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Nieprawidłowy format adresu email');
    }


    const validCategories = ['bug', 'feature', 'performance', 'security', 'other'];
    const validCategory = category && validCategories.includes(category) ? category : 'bug';

    const newReport = new Report({
      title,
      description,
      category: validCategory,
      email,
      status: 'new'
    });

    const savedReport = await newReport.save();
    console.log(`Utworzono nowe zgłoszenie: ${savedReport._id}`);

    const emailResult = await emailService.sendBugReportConfirmation(email, title);
    
    return res.status(201).json({
      success: true,
      message: 'Zgłoszenie zostało przyjęte',
      report: {
        id: savedReport._id,
        title: savedReport.title,
        category: savedReport.category,
        status: savedReport.status,
        createdAt: savedReport.createdAt
      },
      emailSent: emailResult.success,
      emailDetails: emailResult.success ? {
        messageId: emailResult.messageId,
        previewUrl: emailResult.previewUrl 
      } : {
        error: emailResult.error
      }
    });
  } catch (error) {
    console.error('Błąd podczas tworzenia zgłoszenia:', error);
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do przeglądania zgłoszeń'
      });
    }

    // Parametry filtrowania i paginacji
    const { category, status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    // Budowanie zapytania
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    // Pobieranie zgłoszeń z paginacją
    const [reports, total] = await Promise.all([
      Report.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Report.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        reports,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Błąd podczas pobierania zgłoszeń:', error);
    next(error);
  }
};

/**
 * Pobieranie pojedynczego zgłoszenia (tylko dla administratorów)
 */
export const getReportById = async (req, res, next) => {
  try {
    // Sprawdzenie czy użytkownik jest administratorem
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do przeglądania zgłoszeń'
      });
    }

    const { id } = req.params;
    const report = await Report.findById(id).lean();

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Zgłoszenie nie zostało znalezione'
      });
    }

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Błąd podczas pobierania zgłoszenia:', error);
    next(error);
  }
};

/**
 * Aktualizacja statusu zgłoszenia (tylko dla administratorów)
 */
export const updateReportStatus = async (req, res, next) => {
  try {
    // Sprawdzenie czy użytkownik jest administratorem
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do aktualizacji zgłoszeń'
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Walidacja statusu
    const validStatuses = ['new', 'in_progress', 'resolved', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      throw new ValidationError('Nieprawidłowy status. Dozwolone wartości: new, in_progress, resolved, closed');
    }

    // Aktualizacja zgłoszenia
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: 'Zgłoszenie nie zostało znalezione'
      });
    }

    // Wysyłanie powiadomienia email o zmianie statusu
    if (status !== 'new') {
      await emailService.sendReportStatusUpdate(updatedReport.email, updatedReport.title, status);
    }

    return res.status(200).json({
      success: true,
      message: 'Status zgłoszenia został zaktualizowany',
      data: updatedReport
    });
  } catch (error) {
    console.error('Błąd podczas aktualizacji zgłoszenia:', error);
    next(error);
  }
}; 