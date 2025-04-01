import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { User } from '../../src/models/user.model.js';
import { AuthError } from '../../src/utils/errors.js';
import AuthService from '../../src/services/auth.service.js';
import { TokenService } from '../../src/services/token.service.js';
import { EmailService } from '../../src/services/email.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

vi.mock('../../src/models/user.model.js', () => ({
  User: {
    findOne: vi.fn(),
    findById: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis()
    }),
    create: vi.fn(),
  }
}));

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn()
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn()
  }
}));

const mockGenerateToken = vi.fn().mockReturnValue('mock-token');
const mockVerifyToken = vi.fn().mockReturnValue({ userId: 'mock-user-id' });
const mockGeneratePasswordResetToken = vi.fn().mockReturnValue({
  resetToken: 'mock-reset-token',
  hashedToken: 'mock-hashed-token',
  expiresIn: Date.now() + 3600000
});
const mockDecodeGoogleToken = vi.fn().mockReturnValue({
  email: 'google@example.com',
  name: 'Google User',
  picture: 'profile.jpg',
  sub: 'google-123'
});

const mockSendPasswordResetEmail = vi.fn().mockResolvedValue(true);
const mockSendPasswordChangedEmail = vi.fn().mockResolvedValue(true);
const mockSendWelcomeEmail = vi.fn().mockResolvedValue(true);

const mockCreateUser = vi.fn().mockResolvedValue({
  _id: 'new-user-id',
  email: 'test@example.com',
  username: 'testuser',
  password: 'hashed-password'
});

const mockSanitizeUser = vi.fn().mockImplementation((user) => ({
  id: user._id,
  email: user.email,
  username: user.username
}));

const mockHandleGoogleAuth = vi.fn().mockResolvedValue({
  token: 'google-token',
  isNewUser: false,
  user: {
    id: 'google-user-id',
    email: 'google@example.com',
    username: 'googleuser'
  }
});

vi.mock('../../src/services/token.service.js', () => {
  return {
    TokenService: vi.fn().mockImplementation(() => ({
      generateToken: mockGenerateToken,
      verifyToken: mockVerifyToken,
      generatePasswordResetToken: mockGeneratePasswordResetToken,
      decodeGoogleToken: mockDecodeGoogleToken
    }))
  }
});

vi.mock('../../src/services/email.service.js', () => {
  return {
    EmailService: vi.fn().mockImplementation(() => ({
      sendPasswordResetEmail: mockSendPasswordResetEmail,
      sendPasswordChangedEmail: mockSendPasswordChangedEmail,
      sendWelcomeEmail: mockSendWelcomeEmail
    }))
  }
});

vi.mock('../../src/services/user.service.js', () => {
  return {
    UserService: vi.fn().mockImplementation(() => ({
      createUser: mockCreateUser,
      sanitizeUser: mockSanitizeUser,
      handleGoogleAuth: mockHandleGoogleAuth
    }))
  }
});

describe('AuthService', () => {
  let mockUser;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUser = {
      _id: 'user-123',
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashed-password',
      accountType: 'local',
      lastLogin: new Date(),
      save: vi.fn().mockResolvedValue(true),
      stats: {
        level: 1,
        points: 0
      }
    };

    // @ts-ignore
    User.findOne.mockResolvedValue(mockUser);
    // @ts-ignore
    User.findById.mockReturnValue({
      select: vi.fn().mockResolvedValue(mockUser)
    });
    // @ts-ignore
    bcrypt.compare.mockResolvedValue(true);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('loginUser', () => {
    it('should login user with correct data', async () => {
      const email = 'test@example.com';
      const password = 'correct-password';
      const rememberMe = false;

      const result = await AuthService.loginUser(email, password, rememberMe);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(mockUser.save).toHaveBeenCalled();
      
      expect(mockGenerateToken).toHaveBeenCalledWith(mockUser, '24h');
      expect(result).toEqual({
        token: 'mock-token',
        expiresIn: '24h',
        user: expect.any(Object)
      });
    });

    it('should login user with remember me option', async () => {
      const email = 'test@example.com';
      const password = 'correct-password';
      const rememberMe = true;

      const result = await AuthService.loginUser(email, password, rememberMe);

      expect(mockGenerateToken).toHaveBeenCalledWith(mockUser, '30d');
      expect(result.expiresIn).toBe('30d');
    });

    it('should throw AuthError if user does not exist', async () => {
      // @ts-ignore
      User.findOne.mockResolvedValue(null);

      await expect(AuthService.loginUser('nonexistent@example.com', 'password'))
        .rejects.toThrow(AuthError);
    });

    it('should throw AuthError if password is invalid', async () => {
      // @ts-ignore
      bcrypt.compare.mockResolvedValue(false);

      await expect(AuthService.loginUser('test@example.com', 'wrong-password'))
        .rejects.toThrow(AuthError);
    });

    it('should throw AuthError for Google account trying to login through form', async () => {
      mockUser.accountType = 'google';

      await expect(AuthService.loginUser('test@example.com', 'password'))
        .rejects.toThrow(AuthError);
      await expect(AuthService.loginUser('test@example.com', 'password'))
        .rejects.toThrow(/użyj przycisku "Zaloguj przez Google"/i);
    });
  });

  describe('registerUser', () => {
    it('should register new user', async () => {
      const email = 'new@example.com';
      const password = 'secure-password';
      const username = 'newuser';

      const result = await AuthService.registerUser(email, password, username);

      expect(mockCreateUser).toHaveBeenCalledWith(email, password, username);
      expect(User.findById).toHaveBeenCalled();
      expect(mockGenerateToken).toHaveBeenCalled();
      expect(mockSendWelcomeEmail).toHaveBeenCalled();

      expect(result).toEqual({
        token: 'mock-token',
        user: expect.objectContaining({
          isNewUser: true
        })
      });
    });

    it('should handle registration error', async () => {
      mockCreateUser.mockRejectedValueOnce(new AuthError('Użytkownik już istnieje'));

      await expect(AuthService.registerUser('existing@example.com', 'password', 'existinguser'))
        .rejects.toThrow(AuthError);
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email', async () => {
      const email = 'test@example.com';
      
      // @ts-ignore
      jwt.sign.mockReturnValue('reset-token-123');

      const result = await AuthService.forgotPassword(email);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockSendPasswordResetEmail).toHaveBeenCalled();
      
      expect(result).toEqual({
        message: 'Wysłano email do resetowania hasła'
      });
    });

    it('should throw error if email does not exist', async () => {
      // @ts-ignore
      User.findOne.mockResolvedValue(null);

      await expect(AuthService.forgotPassword('nonexistent@example.com'))
        .rejects.toThrow(AuthError);
    });

    it('should throw error if email format is invalid', async () => {
      await expect(AuthService.forgotPassword('invalid-email'))
        .rejects.toThrow('Nieprawidłowy format emaila');
    });

    it('should handle email sending error', async () => {
      mockSendPasswordResetEmail.mockRejectedValueOnce(new Error('Email failure'));

      await expect(AuthService.forgotPassword('test@example.com'))
        .rejects.toThrow('Wystąpił problem z wysłaniem emaila resetowania hasła');
      
      expect(mockUser.save).toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    beforeEach(() => {
      // @ts-ignore
      jwt.verify.mockReturnValue({ userId: 'user-123' });
      
      mockUser.resetPasswordToken = 'valid-token';
      mockUser.resetPasswordExpires = new Date(Date.now() + 3600000);
      
      // @ts-ignore
      User.findOne.mockResolvedValue(mockUser);
    });

    it('should reset user password', async () => {
      const token = 'valid-token';
      const password = 'new-password';
      const confirmPassword = 'new-password';

      const result = await AuthService.resetPassword(token, password, confirmPassword);

      expect(jwt.verify).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalled();
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockSendPasswordChangedEmail).toHaveBeenCalled();
      expect(mockGenerateToken).toHaveBeenCalled();

      expect(result).toEqual({
        status: 'success',
        message: 'Hasło zostało pomyślnie zmienione',
        token: 'mock-token',
        user: expect.objectContaining({
          id: mockUser._id,
          email: mockUser.email,
          username: mockUser.username
        })
      });
    });

    it('should throw error if passwords do not match', async () => {
      await expect(AuthService.resetPassword('token', 'password1', 'password2'))
        .rejects.toThrow('Hasła nie są identyczne');
    });

    it('should throw error if password is too short', async () => {
      await expect(AuthService.resetPassword('token', 'short', 'short'))
        .rejects.toThrow('Hasło musi mieć co najmniej 8 znaków');
    });

    it('should throw error if token is invalid', async () => {
      // @ts-ignore
      jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

      await expect(AuthService.resetPassword('invalid-token', 'password123', 'password123'))
        .rejects.toThrow('Nieprawidłowy lub wygasły token resetowania hasła');
    });

    it('should throw error if token is expired or does not exist', async () => {
      // @ts-ignore
      User.findOne.mockResolvedValue(null);

      await expect(AuthService.resetPassword('expired-token', 'password123', 'password123'))
        .rejects.toThrow('Token resetowania hasła jest nieprawidłowy lub wygasł');
    });
  });

  describe('verifyUserToken', () => {
    it('should verify user token and return user data', async () => {
      const userId = 'user-123';

      const result = await AuthService.verifyUserToken(userId);

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });

    it('should throw error if user does not exist', async () => {
      // @ts-ignore
      User.findById.mockReturnValue({
        select: vi.fn().mockResolvedValue(null)
      });

      await expect(AuthService.verifyUserToken('nonexistent-id'))
        .rejects.toThrow(AuthError);
    });
  });

  describe('googleAuthentication', () => {
    it('should authenticate user through Google', async () => {
      const credential = 'google-credential';
      const rememberMe = false;

      const result = await AuthService.googleAuthentication(credential, rememberMe);

      expect(mockHandleGoogleAuth).toHaveBeenCalledWith(
        credential, 
        rememberMe, 
        expect.any(TokenService), 
        expect.any(EmailService)
      );

      expect(result).toEqual({
        token: 'google-token',
        isNewUser: false,
        user: {
          id: 'google-user-id',
          email: 'google@example.com',
          username: 'googleuser'
        }
      });
    });
  });
}); 