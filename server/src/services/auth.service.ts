import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AuthError } from '../utils/errors.js';
import { EmailService } from './email.service.js';
import { TokenService } from './token.service.js';
import { UserService } from './user.service.js';
import bcrypt from 'bcryptjs';

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
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log(`Nie znaleziono użytkownika z emailem: ${email}`);
        throw new AuthError('Nieprawidłowe dane logowania');
      }

      if (user.accountType === 'google') {
        console.log(`Użytkownik ${user.username} próbuje zalogować się przez formę, ale ma konto Google`);
        throw new AuthError('To konto używa logowania przez Google. Użyj przycisku "Zaloguj przez Google".');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      
      if (!isPasswordValid) {
        console.log(`Nieprawidłowe hasło dla użytkownika: ${user.username}`);
        throw new AuthError('Nieprawidłowe dane logowania');
      }

      user.lastLogin = new Date();
      await user.save();

      const expiresIn = rememberMe ? '30d' : '24h';
      const token = this.tokenService.generateToken(user, String(expiresIn));

      return {
        token,
        expiresIn,
        user: this.userService.sanitizeUser(user)
      };
    } catch (error) {
      console.error('Błąd logowania:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Wystąpił błąd podczas logowania');
    }
  }

  async registerUser(email: string, password: string, username: string) {
    try {
      const user = await this.userService.createUser(email, password, username);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const freshUser = await User.findById(user._id);
      if (!freshUser) {
        throw new AuthError('Błąd podczas tworzenia konta - nie można znaleźć użytkownika');
      }
      
      const token = this.tokenService.generateToken(freshUser, '24h');
      
      try {
        await this.emailService.sendWelcomeEmail(freshUser);
      } catch (emailError) {
        console.error('Błąd wysyłania emaila powitalnego:', emailError);
      }
      
      return {
        token, 
        user: {
          ...this.userService.sanitizeUser(freshUser),
          isNewUser: true
        }
      };
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError(`Wystąpił błąd podczas rejestracji: ${error.message}`);
    }
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
      await this.emailService.sendPasswordChangedEmail(user);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila potwierdzającego zmianę hasła:', emailError);
    }

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