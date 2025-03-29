import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AuthError } from '../utils/errors.js';
import { EmailService } from './email.service.js';
import { TokenService } from './token.service.js';
import { UserService } from './user.service.js';

class AuthService {
  private emailService: EmailService;
  private tokenService: TokenService;
  private userService: UserService;

  constructor() {
    this.emailService = new EmailService();
    this.tokenService = new TokenService();
    this.userService = new UserService();
  }

  async loginUser(email: string, password: string, rememberMe = false) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    if (user.accountType === 'google') {
      throw new AuthError('To konto używa logowania przez Google. Użyj przycisku "Zaloguj przez Google".');
    }

    // @ts-ignore - ignorujemy błąd TypeScript, zakładając że model ma tę metodę
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    user.lastLogin = new Date();
    await user.save();

    const expiresIn = rememberMe ? '30d' : '24h';
    // @ts-ignore - ignorujemy błąd typowania
    const token = this.tokenService.generateToken(user, expiresIn);

    return {
      token,
      expiresIn,
      // @ts-ignore - ignorujemy błąd typowania
      user: this.userService.sanitizeUser(user)
    };
  }

  async registerUser(email: string, password: string, username: string) {
    const user = await this.userService.createUser(email, password, username);
    const token = this.tokenService.generateToken(user);

    try {
      await this.emailService.sendWelcomeEmail(user);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila powitalnego:', emailError);
    }

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isNewUser: true,
        stats: user.stats
      }
    };
  }


  async forgotPassword(email: string) {
    if (!email) {
      throw new Error('Email jest wymagany');
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Nieprawidłowy format emaila');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      // @ts-ignore - ignorujemy błąd typowania
      await this.emailService.sendPasswordResetEmail(user, resetUrl);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila resetowania hasła:', emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      throw new Error('Wystąpił problem z wysłaniem emaila resetowania hasła');
    }

    return {
      message: 'Wysłano email do resetowania hasła'
    };
  }

  async resetPassword(token: string, password: string, confirmPassword: string) {
    if (!token || !password) {
      throw new Error('Token i nowe hasło są wymagane');
    }

    if (password !== confirmPassword) {
      throw new Error('Hasła nie są identyczne');
    }

    if (password.length < 8) {
      throw new Error('Hasło musi mieć co najmniej 8 znaków');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    } catch (error) {
      console.error('Błąd weryfikacji tokenu:', error);
      throw new Error('Nieprawidłowy lub wygasły token resetowania hasła');
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      throw new Error('Token resetowania hasła jest nieprawidłowy lub wygasł');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date();

    await user.save();

    try {
      // @ts-ignore - ignorujemy błąd typowania
      await this.emailService.sendPasswordChangedEmail(user);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila potwierdzającego zmianę hasła:', emailError);
    }

    // @ts-ignore - ignorujemy błąd typowania
    const authToken = this.tokenService.generateToken(user);

    return {
      status: 'success',
      message: 'Hasło zostało pomyślnie zmienione',
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    };
  }

  async verifyUserToken(userId: string) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    return user;
  }

  async googleAuthentication(credential: string, rememberMe = false) {
    return this.userService.handleGoogleAuth(credential, rememberMe, this.tokenService, this.emailService);
  }
}

export default new AuthService(); 