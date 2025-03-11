import { User } from '../../models/user.model.js';
import { AuthError } from '../../utils/errors.js';
import { StreakService } from '../../services/streak.service.js';
import { generateToken } from './utils.js';

export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    if (user.accountType === 'google') {
      throw new AuthError('To konto używa logowania przez Google. Użyj przycisku "Zaloguj przez Google".');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    user.lastLogin = new Date();
    await user.save();

    const expiresIn = rememberMe ? '30d' : '24h';
    const token = generateToken(user, expiresIn);

    await StreakService.updateLoginStreak(user._id);

    res.json({
      token,
      expiresIn,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        profile: user.profile,
        preferences: user.preferences,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
}; 