import { Request, Response, NextFunction } from 'express';

import { userService } from '../../../services/users/user.service.js';
import { AuthError } from '../../../utils/errors.js';

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.params.id;

    const userId = profileId || req.user?.userId;

    if (!userId) throw new AuthError('Brak autoryzacji');

    const profileResponse = await userService.getUserProfile(userId);
    res.success(profileResponse.data, 'Profil użytkownika pobrany pomyślnie');
  } catch (error) {
    next(error);
  }
};

export const getActiveUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activeUsersResponse = await userService.getActiveUsers();
    res.success(activeUsersResponse, 'Aktywni użytkownicy pobrani pomyślnie');
  } catch (error) {
    next(error);
  }
};
