import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const getGroupsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tag, search, page = '1', limit = '10' } = req.query;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
      ]);
      return;
    }
    
    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(limit as string, 10);
    
    const options = {
      userId,
      tag: tag as string,
      search: search as string,
      page: currentPage,
      limit: itemsPerPage
    };
    
    const result = await GroupService.getGroups(options);
    
    if (!result) {
      res.error('Błąd podczas pobierania grup');
      return;
    }
    
    // Sprawdzamy czy wynik ma strukturę paginacji
    if (result.groups && typeof result.total === 'number') {
      res.paginated(
        result.groups,
        currentPage,
        itemsPerPage,
        result.total,
        'Grupy pobrane pomyślnie'
      );
      return;
    }
    
    res.success(result, 'Grupy pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 