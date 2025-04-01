import { User } from '../../models/user.model.js';
import { ValidationError, AuthError } from '../../utils/errors.js';
import bcrypt from 'bcryptjs';

export class AccountService {
  static async deleteAccount(userId: string, password: string): Promise<void> {
    if (!password) {
      throw new ValidationError('Hasło jest wymagane');
    }
    
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new AuthError('Nieprawidłowe hasło');
    }
    
    await User.findByIdAndDelete(userId);
  }
} 