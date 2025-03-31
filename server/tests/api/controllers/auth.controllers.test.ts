import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from '../../../src/api/controllers/auth/login.js';
import { register } from '../../../src/api/controllers/auth/register.js';
import { forgotPassword, resetPassword } from '../../../src/api/controllers/auth/password.js';
import { verifyToken } from '../../../src/api/controllers/auth/token.js';
import { googleAuth } from '../../../src/api/controllers/auth/google.js';
import authService from '../../../src/services/auth.service.js';
import { AuthError } from '../../../src/utils/errors.js';

vi.mock('../../../src/services/auth.service.js', () => ({
  default: {
    loginUser: vi.fn(),
    registerUser: vi.fn(),
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    verifyUserToken: vi.fn(),
    googleAuthentication: vi.fn()
  }
}));

describe('Auth Controllers', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReq = {
      body: {},
      user: { userId: 'user-123' },
      params: {}
    };

    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
      setHeader: vi.fn()
    };

    mockNext = vi.fn();
  });

  describe('login controller', () => {
    it('should log in a user and return a token', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true
      };

      const loginResponse = {
        token: 'jwt-token',
        expiresIn: '30d',
        user: {
          id: 'user-123',
          email: 'test@example.com',
          username: 'testuser'
        }
      };

      mockReq.body = credentials;
      // @ts-ignore
      authService.loginUser.mockResolvedValue(loginResponse);

      await login(mockReq, mockRes, mockNext);

      expect(authService.loginUser).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
        credentials.rememberMe
      );
      expect(mockRes.json).toHaveBeenCalledWith(loginResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when required fields are missing', async () => {
      mockReq.body = { email: 'test@example.com' }; // Brak hasła

      await login(mockReq, mockRes, mockNext);

      expect(authService.loginUser).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(AuthError));
    });

    it('should handle authentication service errors', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const error = new AuthError('Nieprawidłowe dane logowania');
      // @ts-ignore
      authService.loginUser.mockRejectedValue(error);

      await login(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('register controller', () => {
    it('should register a user and return a token', async () => {
      const userData = {
        email: 'new@example.com',
        password: 'password123',
        username: 'newuser'
      };

      const registerResponse = {
        token: 'jwt-token',
        user: {
          id: 'user-123',
          email: 'new@example.com',
          username: 'newuser',
          isNewUser: true
        }
      };

      mockReq.body = userData;
      // @ts-ignore
      authService.registerUser.mockResolvedValue(registerResponse);

      await register(mockReq, mockRes, mockNext);

      expect(authService.registerUser).toHaveBeenCalledWith(
        userData.email,
        userData.password,
        userData.username
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(registerResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when required fields are missing', async () => {
      mockReq.body = { email: 'new@example.com', password: 'password123' }; // Brak username

      await register(mockReq, mockRes, mockNext);

      expect(authService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(AuthError));
    });

    it('should call next with an error when password is too short', async () => {
      mockReq.body = {
        email: 'new@example.com',
        password: 'short',
        username: 'newuser'
      };

      await register(mockReq, mockRes, mockNext);

      expect(authService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(AuthError));
    });

    it('should call next with an error when email has an invalid format', async () => {
      mockReq.body = {
        email: 'invalid-email',
        password: 'password123',
        username: 'newuser'
      };

      await register(mockReq, mockRes, mockNext);

      expect(authService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(AuthError));
    });
  });

  describe('forgotPassword controller', () => {
    it('should handle a password reset request', async () => {
      const email = 'test@example.com';
      const response = { message: 'Wysłano email do resetowania hasła' };

      mockReq.body = { email };
      // @ts-ignore
      authService.forgotPassword.mockResolvedValue(response);

      await forgotPassword(mockReq, mockRes, mockNext);

      expect(authService.forgotPassword).toHaveBeenCalledWith(email);
      expect(mockRes.json).toHaveBeenCalledWith(response);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle password reset errors', async () => {
      mockReq.body = { email: 'test@example.com' };

      const error = new Error('Nie znaleziono użytkownika');
      // @ts-ignore
      authService.forgotPassword.mockRejectedValue(error);

      await forgotPassword(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('resetPassword controller', () => {
    it('should reset a user password', async () => {
      const passwordData = {
        token: 'reset-token',
        password: 'new-password',
        confirmPassword: 'new-password'
      };

      const response = {
        status: 'success',
        message: 'Hasło zostało pomyślnie zmienione',
        token: 'new-jwt-token',
        user: {
          id: 'user-123',
          email: 'test@example.com',
          username: 'testuser'
        }
      };

      mockReq.body = passwordData;
      // @ts-ignore
      authService.resetPassword.mockResolvedValue(response);

      await resetPassword(mockReq, mockRes, mockNext);

      expect(authService.resetPassword).toHaveBeenCalledWith(
        passwordData.token,
        passwordData.password,
        passwordData.confirmPassword
      );
      expect(mockRes.json).toHaveBeenCalledWith(response);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle password reset errors', async () => {
      mockReq.body = {
        token: 'invalid-token',
        password: 'new-password',
        confirmPassword: 'new-password'
      };

      const error = new Error('Token resetowania hasła jest nieprawidłowy lub wygasł');
      // @ts-ignore
      authService.resetPassword.mockRejectedValue(error);

      await resetPassword(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('verifyToken controller', () => {
    it('should verify a user token', async () => {
      const userData = {
        _id: 'user-123',
        email: 'test@example.com',
        username: 'testuser'
      };

      // @ts-ignore
      authService.verifyUserToken.mockResolvedValue(userData);

      await verifyToken(mockReq, mockRes, mockNext);

      expect(authService.verifyUserToken).toHaveBeenCalledWith('user-123');
      expect(mockRes.json).toHaveBeenCalledWith(userData);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle an invalid token error', async () => {
      mockReq.user = null; 

      await verifyToken(mockReq, mockRes, mockNext);

      expect(authService.verifyUserToken).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Nieprawidłowy token' });
    });

    it('should handle token verification errors', async () => {
      const error = new AuthError('Użytkownik nie znaleziony');
      // @ts-ignore
      authService.verifyUserToken.mockRejectedValue(error);

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Nieprawidłowy token' });
    });
  });

  describe('googleAuth controller', () => {
    it('should authenticate a user through Google', async () => {
      const googleData = {
        credential: 'google-token',
        rememberMe: true
      };

      const response = {
        token: 'jwt-token',
        user: {
          id: 'user-123',
          email: 'google@example.com',
          username: 'googleuser'
        },
        isNewUser: false
      };

      mockReq.body = googleData;
      // @ts-ignore
      authService.googleAuthentication.mockResolvedValue(response);

      await googleAuth(mockReq, mockRes, mockNext);

      expect(authService.googleAuthentication).toHaveBeenCalledWith(
        googleData.credential,
        googleData.rememberMe
      );
      expect(mockRes.json).toHaveBeenCalledWith(response);
    });

    it('should handle Google authentication errors', async () => {
      mockReq.body = { credential: 'invalid-token' };
      mockRes.setHeader = vi.fn();

      const error = new Error('Nieprawidłowy token Google');
      // @ts-ignore
      authService.googleAuthentication.mockRejectedValue(error);

      await googleAuth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Nieprawidłowy token Google'
      });
    });
  });
}); 