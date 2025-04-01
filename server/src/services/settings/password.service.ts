import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import bcrypt from 'bcryptjs';
import { ChangePasswordDTO } from '../../types/settings/index.js';

export class PasswordService {
  static async changePassword(userId: string, passwordData: ChangePasswordDTO): Promise<void> {
    const { currentPassword, newPassword } = passwordData;

    if (!currentPassword || !newPassword) {
      throw new ValidationError('Obecne i nowe hasło są wymagane');
    }

    if (newPassword.length < 6) {
      throw new ValidationError('Nowe hasło musi mieć co najmniej 6 znaków');
    }

    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new ValidationError('Obecne hasło jest nieprawidłowe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
  }
} 