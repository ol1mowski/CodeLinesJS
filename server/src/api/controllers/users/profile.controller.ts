import { Request, Response, NextFunction } from 'express';
import { userService } from '../../../services/users/user.service.js';
import { AuthError } from '../../../utils/errors.js';

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const profileResponse = await userService.getUserProfile(userId);
    res.json(profileResponse);
  } catch (error) {
    next(error);
  }
};

export const getActiveUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activeUsersResponse = await userService.getActiveUsers();
    res.json(activeUsersResponse);
  } catch (error) {
    next(error);
  }
}; 