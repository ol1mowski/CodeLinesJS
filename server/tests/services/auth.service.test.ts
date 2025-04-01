import { describe, it, expect, vi, beforeEach } from 'vitest';
import authService from '../../src/services/auth.service.js';
import { AuthError } from '../../src/utils/errors.js';

vi.mock('../../src/models/user.model.js', () => ({
  User: {
    findOne: vi.fn(),
    findById: vi.fn()
  }
}));

import { User } from '../../src/models/user.model.js';

type MockedFunction<T extends (...args: any) => any> = {
  [P in keyof ReturnType<typeof vi.fn>]: ReturnType<typeof vi.fn>[P]
} & T;

interface MockedUser {
  findOne: MockedFunction<typeof User.findOne>;
  findById: MockedFunction<typeof User.findById>;
}

interface MockedAuthService {
  loginUser: MockedFunction<typeof authService.loginUser>;
  registerUser: MockedFunction<typeof authService.registerUser>;
  forgotPassword: MockedFunction<typeof authService.forgotPassword>;
  resetPassword: MockedFunction<typeof authService.resetPassword>;
  googleAuthentication: MockedFunction<typeof authService.googleAuthentication>;
  googleAuthService: {
    verifyGoogleToken: MockedFunction<any>;
  };
}

vi.mock('jsonwebtoken', () => ({
  sign: vi.fn().mockReturnValue('jwt-token'),
  verify: vi.fn().mockReturnValue({ userId: 'user-123' })
}));

vi.mock('bcryptjs', () => ({
  compare: vi.fn().mockResolvedValue(true)
}));

vi.mock('../../src/services/email.service.js', () => ({
  EmailService: function() {
    return {
      sendWelcomeEmail: vi.fn().mockResolvedValue(true),
      sendPasswordResetEmail: vi.fn().mockResolvedValue(true),
      sendPasswordChangedEmail: vi.fn().mockResolvedValue(true)
    };
  }
}));

vi.mock('../../src/services/token.service.js', () => ({
  TokenService: function() {
    return {
      generateToken: vi.fn().mockReturnValue('jwt-token')
    };
  }
}));

vi.mock('../../src/services/user.service.js', () => ({
  UserService: function() {
    return {
      sanitizeUser: vi.fn().mockReturnValue({
        id: 'user-123',
        email: 'test@example.com',
        username: 'testuser'
      }),
      createUser: vi.fn(),
      createGoogleUser: vi.fn()
    };
  }
}));

vi.mock('../../src/services/auth.service.js', () => {
  return {
    default: {
      loginUser: vi.fn(),
      registerUser: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn(),
      googleAuthentication: vi.fn(),
      googleAuthService: {
        verifyGoogleToken: vi.fn()
      }
    }
  };
});

describe('AuthService', () => {
  let mockUser;
  let mockSanitizedUser;
  let mockedUser: MockedUser;
  let mockedAuthService: MockedAuthService;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUser = {
      _id: 'user-123',
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashed-password',
      accountType: 'local',
      lastLogin: null,
      save: vi.fn().mockResolvedValue(true)
    };

    mockSanitizedUser = {
      id: 'user-123',
      email: 'test@example.com',
      username: 'testuser'
    };

    mockedUser = User as unknown as MockedUser;
    mockedAuthService = authService as unknown as MockedAuthService;

    mockedUser.findOne.mockResolvedValue(mockUser);
    mockedUser.findById.mockResolvedValue(mockUser);

    mockedAuthService.loginUser.mockResolvedValue({
      token: 'jwt-token',
      expiresIn: '30d',
      user: mockSanitizedUser
    });

    mockedAuthService.registerUser.mockResolvedValue({
      token: 'jwt-token',
      user: {
        ...mockSanitizedUser,
        isNewUser: true
      }
    });
    
    mockedAuthService.forgotPassword.mockResolvedValue({
      message: 'Wysłano email do resetowania hasła'
    });
    
    mockedAuthService.resetPassword.mockResolvedValue({
      status: 'success',
      message: 'Hasło zostało pomyślnie zmienione',
      token: 'jwt-token',
      user: {
        id: mockUser._id,
        email: mockUser.email,
        username: mockUser.username
      }
    });
    
    mockedAuthService.googleAuthentication.mockImplementation((token, rememberMe) => {
      if (token === 'google-token') {
        return Promise.resolve({
          token: 'jwt-token',
          expiresIn: '30d',
          user: mockSanitizedUser,
          isNewUser: false
        });
      } else if (token === 'new-google-token') {
        return Promise.resolve({
          token: 'jwt-token',
          expiresIn: '24h',
          user: {
            ...mockSanitizedUser,
            email: 'newgoogle@example.com',
            username: 'New Google User',
          },
          isNewUser: true
        });
      }
    });
    
    mockedAuthService.googleAuthService.verifyGoogleToken.mockImplementation((token) => {
      if (token === 'google-token') {
        return Promise.resolve({
          email: 'google@example.com',
          name: 'Google User',
          picture: 'https://example.com/avatar.jpg'
        });
      } else {
        return Promise.resolve({
          email: 'newgoogle@example.com',
          name: 'New Google User',
          picture: 'https://example.com/avatar.jpg'
        });
      }
    });
  });

  describe('loginUser', () => {
    it('should return a token and user information after successful login', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const rememberMe = true;

      const result = await authService.loginUser(email, password, rememberMe);

      expect(mockedAuthService.loginUser).toHaveBeenCalledWith(email, password, rememberMe);
      expect(result).toEqual({
        token: 'jwt-token',
        expiresIn: '30d',
        user: mockSanitizedUser
      });
    });

    it('should throw an error if the user is not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      mockedAuthService.loginUser.mockRejectedValueOnce(new AuthError('Nieprawidłowe dane logowania'));

      await expect(authService.loginUser(email, password)).rejects.toThrow(AuthError);
    });

    it('should throw an error if the password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrong-password';

      mockedAuthService.loginUser.mockRejectedValueOnce(new AuthError('Nieprawidłowe dane logowania'));

      await expect(authService.loginUser(email, password)).rejects.toThrow(AuthError);
    });

    it('should throw an error if the user has a Google account', async () => {
      const email = 'google@example.com';
      const password = 'password123';

      mockedAuthService.loginUser.mockRejectedValueOnce(new AuthError('To konto używa logowania przez Google'));

      await expect(authService.loginUser(email, password)).rejects.toThrow(AuthError);
    });
  });

  describe('registerUser', () => {
    it('should register a new user and return a token', async () => {
      const email = 'new@example.com';
      const password = 'password123';
      const username = 'newuser';

      const result = await authService.registerUser(email, password, username);

      expect(mockedAuthService.registerUser).toHaveBeenCalledWith(email, password, username);
      expect(result).toEqual({
        token: 'jwt-token',
        user: {
          ...mockSanitizedUser,
          isNewUser: true
        }
      });
    });

    it('should handle an error when a registered user is not found', async () => {
      const email = 'new@example.com';
      const password = 'password123';
      const username = 'newuser';

      mockedAuthService.registerUser.mockRejectedValueOnce(new AuthError('Błąd podczas tworzenia konta - nie można znaleźć użytkownika'));

      await expect(authService.registerUser(email, password, username)).rejects.toThrow(AuthError);
    });
  });

  describe('forgotPassword', () => {
    it('should send a password reset email', async () => {
      const email = 'test@example.com';

      const result = await authService.forgotPassword(email);

      expect(mockedAuthService.forgotPassword).toHaveBeenCalledWith(email);
      expect(result).toEqual({
        message: 'Wysłano email do resetowania hasła'
      });
    });

    it('should throw an error if the user is not found', async () => {
      const email = 'nonexistent@example.com';

      mockedAuthService.forgotPassword.mockRejectedValueOnce(new AuthError('Użytkownik nie znaleziony'));

      await expect(authService.forgotPassword(email)).rejects.toThrow(AuthError);
    });
  });

  describe('resetPassword', () => {
    it('should reset the user password', async () => {
      const token = 'reset-token';
      const password = 'new-password';
      const confirmPassword = 'new-password';

      const result = await authService.resetPassword(token, password, confirmPassword);
      
      expect(mockedAuthService.resetPassword).toHaveBeenCalledWith(token, password, confirmPassword);
      expect(result).toEqual({
        status: 'success',
        message: 'Hasło zostało pomyślnie zmienione',
        token: 'jwt-token',
        user: expect.objectContaining({
          id: mockUser._id,
          email: mockUser.email,
          username: mockUser.username
        })
      });
    });

    it('should throw an error if the passwords are not identical', async () => {
      const token = 'reset-token';
      const password = 'new-password';
      const confirmPassword = 'different-password';

      mockedAuthService.resetPassword.mockRejectedValueOnce(new Error('Hasła nie są identyczne'));

      await expect(authService.resetPassword(token, password, confirmPassword)).rejects.toThrow(Error);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalid-token';
      const password = 'new-password';
      const confirmPassword = 'new-password';

      mockedAuthService.resetPassword.mockRejectedValueOnce(new Error('Nieprawidłowy lub wygasły token resetowania hasła'));

      await expect(authService.resetPassword(token, password, confirmPassword)).rejects.toThrow(Error);
    });
  });

  describe('googleAuthentication', () => {
    it('should authenticate user through Google and return a token', async () => {
      const token = 'google-token';
      const rememberMe = true;

      const result = await authService.googleAuthentication(token, rememberMe);

      expect(mockedAuthService.googleAuthentication).toHaveBeenCalledWith(token, rememberMe);
      expect(result).toEqual({
        token: 'jwt-token',
        expiresIn: '30d',
        user: mockSanitizedUser,
        isNewUser: false
      });
    });
    
    it('should create a new Google account if the user does not exist', async () => {
      const token = 'new-google-token';
      const rememberMe = false;

      const result = await authService.googleAuthentication(token, rememberMe);
      
      expect(mockedAuthService.googleAuthentication).toHaveBeenCalledWith(token, rememberMe);
      expect(result).toEqual(expect.objectContaining({
        token: 'jwt-token',
        isNewUser: true
      }));
    });
  });
}); 