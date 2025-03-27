import jwt from 'jsonwebtoken';
import { User } from '../../../models/user.model.js';
import { AuthError } from '../../../utils/errors.js';
import { generateToken, sendPasswordResetEmail, sendPasswordChangedEmail } from './utils.js';

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email jest wymagany'
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        error: 'Nieprawidłowy format emaila'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      await sendPasswordResetEmail(user, resetUrl);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila resetowania hasła:', emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      throw new Error('Wystąpił problem z wysłaniem emaila resetowania hasła');
    }

    res.json({
      message: 'Wysłano email do resetowania hasła'
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Token i nowe hasło są wymagane'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Hasła nie są identyczne'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Hasło musi mieć co najmniej 8 znaków'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Błąd weryfikacji tokenu:', error);
      return res.status(400).json({
        status: 'error',
        message: 'Nieprawidłowy lub wygasły token resetowania hasła'
      });
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Token resetowania hasła jest nieprawidłowy lub wygasł'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date();

    await user.save();

    try {
      await sendPasswordChangedEmail(user);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila potwierdzającego zmianę hasła:', emailError);
    }

    const authToken = generateToken(user);

    res.status(200).json({
      status: 'success',
      message: 'Hasło zostało pomyślnie zmienione',
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Błąd resetowania hasła:', error);
    next(error);
  }
}; 