import { User } from '../../../models/user.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('username email profile preferences stats.level')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
}; 