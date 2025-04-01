import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { AuthError } from '../../../utils/errors.js';

export const createGroupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { name, description, tags } = req.body;

    const result = await GroupService.createGroup({
      name,
      description,
      tags,
      userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Grupa została utworzona pomyślnie',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 