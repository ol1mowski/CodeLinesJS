import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const result = await GroupService.getGroupById(id, userId);

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 