import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const getGroupsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tag, search, page, limit } = req.query;
    const userId = req.user?.userId;
    
    const options = {
      userId,
      tag: tag as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined
    };
    
    const result = await GroupService.getGroups(options);
    
    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 