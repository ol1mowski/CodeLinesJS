import { Request, Response, NextFunction } from 'express';

import { CVService } from '../../../services/cv/cv.service.js';
import { CVTipQuery, CVExampleQuery, CVUserProgressUpdate } from '../../../types/cv.types.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export class CVController {
  static getTips = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const query: CVTipQuery = {
      category: req.query.category as string,
      importance: req.query.importance as 'low' | 'medium' | 'high' | 'critical',
      search: req.query.search as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      sortBy:
        (req.query.sortBy as 'createdAt' | 'importance' | 'viewCount' | 'helpfulCount') || 'order',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
    };

    if (query.limit && (query.limit < 1 || query.limit > 50)) {
      return res.fail(
        'Limit musi być między 1 a 50',
        [{ code: 'INVALID_LIMIT', message: 'Limit musi być między 1 a 50' }],
        400,
      );
    }

    if (query.page && query.page < 1) {
      return res.fail(
        'Numer strony musi być większy od 0',
        [{ code: 'INVALID_PAGE', message: 'Numer strony musi być większy od 0' }],
        400,
      );
    }

    const userId = req.user?.userId;
    const result = await CVService.getTips(query, userId);

    res.success(result, 'Porady CV pobrane pomyślnie');
  });

  static getExamples = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const query: CVExampleQuery = {
      type: req.query.type as 'full-cv' | 'section' | 'skill-description' | 'project-description',
      level: req.query.level as 'junior' | 'mid' | 'senior',
      field: req.query.field as 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops',
      search: req.query.search as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      sortBy:
        (req.query.sortBy as 'createdAt' | 'viewCount' | 'copyCount' | 'helpfulCount') || 'order',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
    };

    if (query.limit && (query.limit < 1 || query.limit > 50)) {
      return res.fail(
        'Limit musi być między 1 a 50',
        [{ code: 'INVALID_LIMIT', message: 'Limit musi być między 1 a 50' }],
        400,
      );
    }

    if (query.page && query.page < 1) {
      return res.fail(
        'Numer strony musi być większy od 0',
        [{ code: 'INVALID_PAGE', message: 'Numer strony musi być większy od 0' }],
        400,
      );
    }

    const userId = req.user?.userId;
    const result = await CVService.getExamples(query, userId);

    res.success(result, 'Przykłady CV pobrane pomyślnie');
  });

  static getStats = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.userId;
    const stats = await CVService.getStats(userId);

    res.success(stats, 'Statystyki CV pobrane pomyślnie');
  });

  static updateProgress = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.fail(
        'Brak autoryzacji',
        [{ code: 'AUTH_REQUIRED', message: 'Musisz być zalogowany aby śledzić postęp' }],
        401,
      );
    }

    const { type, itemId, sectionId, timeSpent, isHelpful } = req.body;

    if (!type || !itemId) {
      return res.fail(
        'Brakuje wymaganych pól',
        [{ code: 'MISSING_FIELDS', message: 'Wymagane pola: type, itemId' }],
        400,
      );
    }

    const validTypes = ['tip_viewed', 'example_viewed', 'example_copied', 'section_completed'];
    if (!validTypes.includes(type)) {
      return res.fail(
        'Nieprawidłowy typ akcji',
        [{ code: 'INVALID_TYPE', message: 'Typ musi być jednym z: ' + validTypes.join(', ') }],
        400,
      );
    }

    if (type === 'section_completed' && !sectionId) {
      return res.fail(
        'Brakuje identyfikatora sekcji',
        [
          {
            code: 'MISSING_SECTION_ID',
            message: 'sectionId jest wymagane dla typu section_completed',
          },
        ],
        400,
      );
    }

    const update: CVUserProgressUpdate = {
      type,
      itemId,
      sectionId,
      timeSpent,
      isHelpful,
    };

    await CVService.updateUserProgress(userId, update);

    res.success({ message: 'Postęp zaktualizowany pomyślnie' }, 'Postęp zapisany');
  });

  static getProgress = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.fail(
        'Brak autoryzacji',
        [{ code: 'AUTH_REQUIRED', message: 'Musisz być zalogowany aby zobaczyć postęp' }],
        401,
      );
    }

    const stats = await CVService.getStats(userId);

    res.success(
      stats.userProgress || {
        tipsViewed: 0,
        examplesViewed: 0,
        completedSections: 0,
        totalSections: 4,
        completionPercentage: 0,
        lastActivityAt: new Date().toISOString(),
      },
      'Postęp użytkownika pobrany pomyślnie',
    );
  });
}
