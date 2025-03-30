// @ts-nocheck
import { User } from '../../../models/user.model.js';
import { AuthError } from '../../../utils/errors.js';

export const deleteAccountController = async (req, res, next) => {
    try {
      const { password } = req.body;
      
      const user = await User.findById(req.user.userId);
      if (!user) {
        throw new AuthError('Użytkownik nie znaleziony');
      }
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new AuthError('Nieprawidłowe hasło');
      }
      
      await User.findByIdAndDelete(req.user.userId);
      
      res.json({ message: 'Konto zostało usunięte' });
    } catch (error) {
      next(error);
    }
  };