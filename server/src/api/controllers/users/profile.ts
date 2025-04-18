import { User } from '../../../models/user.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('username email profile preferences stats.level')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    res.success(user, 'Profil użytkownika pobrany pomyślnie');
  } catch (error) {
    next(error);
  }
}; 