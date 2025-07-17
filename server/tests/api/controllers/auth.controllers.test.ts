import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from '../../../src/api/controllers/auth/login.js';
import { register } from '../../../src/api/controllers/auth/register.js';
import { forgotPassword, resetPassword } from '../../../src/api/controllers/auth/password.js';
import { verifyToken } from '../../../src/api/controllers/auth/token.js';
import { googleAuth } from '../../../src/api/controllers/auth/google.js';
import { logout } from '../../../src/api/controllers/auth/logout.js';
import authService from '../../../src/services/auth.service.js';
import { AuthError } from '../../../src/utils/errors.js';
import { mockResponseUtils } from '../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      fail: any;
      error: any;
      paginated: any;
    }
  }
}

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

const mockedAuthService = vi.mocked(authService, true);

describe('Auth Controllers', () => {
  let mockReq: any;
  let mockRes: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let mockNext: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReq = {
      body: {},
      user: { userId: 'user-123' },
      params: {}
    };

    mockRes = mockResponseUtils.createMockResponse();

    mockNext = vi.fn();
  });

  describe('login controller', () => {
    it('should log in a user and set httpOnly cookie', async () => {
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
      mockedAuthService.loginUser.mockResolvedValue(loginResponse);

      await login(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.loginUser).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
        credentials.rememberMe
      );
      
      expect(mockRes.cookie).toHaveBeenCalledWith('jwt', 'jwt-token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
      });
      
      const { token, ...responseData } = loginResponse;
      expect(mockRes.success).toHaveBeenCalledWith(responseData, 'Logowanie zakończone pomyślnie');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when required fields are missing', async () => {
      mockReq.body = { email: 'test@example.com' };

      await login(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.loginUser).not.toHaveBeenCalled();
      expect(mockRes.fail).toHaveBeenCalledWith('Email i hasło są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Email i hasło są wymagane' }
      ]);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle authentication service errors', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const error = new AuthError('Nieprawidłowe dane logowania');
      mockedAuthService.loginUser.mockRejectedValue(error);

      await login(mockReq, mockRes as any, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('register controller', () => {
    it('should register a user and set httpOnly cookie', async () => {
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
      mockedAuthService.registerUser.mockResolvedValue(registerResponse);

      await register(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.registerUser).toHaveBeenCalledWith(
        userData.email,
        userData.password,
        userData.username
      );
      
      expect(mockRes.cookie).toHaveBeenCalledWith('jwt', 'jwt-token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });
      
      const { token, ...responseData } = registerResponse;
      expect(mockRes.success).toHaveBeenCalledWith(responseData, 'Rejestracja zakończona pomyślnie');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when required fields are missing', async () => {
      mockReq.body = { email: 'new@example.com', password: 'password123' };

      await register(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.fail).toHaveBeenCalledWith('Email, hasło i nazwa użytkownika są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Email, hasło i nazwa użytkownika są wymagane' }
      ]);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when password is too short', async () => {
      mockReq.body = {
        email: 'new@example.com',
        password: 'short',
        username: 'newuser'
      };

      await register(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.fail).toHaveBeenCalledWith('Hasło musi mieć co najmniej 8 znaków', expect.any(Array));
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with an error when email has an invalid format', async () => {
      mockReq.body = {
        email: 'invalid-email',
        password: 'password123',
        username: 'newuser'
      };

      await register(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.registerUser).not.toHaveBeenCalled();
      expect(mockRes.fail).toHaveBeenCalledWith('Nieprawidłowy format adresu email', expect.any(Array));
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('forgotPassword controller', () => {
    it('should handle a password reset request', async () => {
      const email = 'test@example.com';
      const response = { message: 'Wysłano email do resetowania hasła' };

      mockReq.body = { email };
      mockedAuthService.forgotPassword.mockResolvedValue(response);

      await forgotPassword(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.forgotPassword).toHaveBeenCalledWith(email);
      expect(mockRes.success).toHaveBeenCalledWith(response, 'Link do resetowania hasła został wysłany na podany adres email');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle password reset errors', async () => {
      mockReq.body = { email: 'test@example.com' };

      const error = new Error('Nie znaleziono użytkownika');
      mockedAuthService.forgotPassword.mockRejectedValue(error);

      await forgotPassword(mockReq, mockRes as any, mockNext);

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
      mockedAuthService.resetPassword.mockResolvedValue(response);

      await resetPassword(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.resetPassword).toHaveBeenCalledWith(
        passwordData.token,
        passwordData.password,
        passwordData.confirmPassword
      );
      expect(mockRes.success).toHaveBeenCalledWith(response, 'Hasło zostało zmienione pomyślnie');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle password reset errors', async () => {
      mockReq.body = {
        token: 'invalid-token',
        password: 'new-password',
        confirmPassword: 'new-password'
      };

      const error = new Error('Token resetowania hasła jest nieprawidłowy lub wygasł');
      mockedAuthService.resetPassword.mockRejectedValue(error);

      await resetPassword(mockReq, mockRes as any, mockNext);

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
      mockedAuthService.verifyUserToken.mockResolvedValue(userData);

      await verifyToken(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.verifyUserToken).toHaveBeenCalledWith('user-123');
      expect(mockRes.success).toHaveBeenCalledWith(userData, 'Token zweryfikowany pomyślnie');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle an invalid token error', async () => {
      mockReq.user = undefined;

      await verifyToken(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.verifyUserToken).not.toHaveBeenCalled();
      expect(mockRes.fail).toHaveBeenCalledWith('Brak tokenu autoryzacyjnego', [
        { code: 'MISSING_TOKEN', message: 'Brak tokenu autoryzacyjnego' }
      ], 401);
    });

    it('should handle token verification errors', async () => {
      const error = new Error('Nieprawidłowy token');
      mockedAuthService.verifyUserToken.mockRejectedValue(error);

      await verifyToken(mockReq, mockRes as any, mockNext);

      expect(mockRes.fail).toHaveBeenCalledWith('Nieprawidłowy token', [
        { code: 'INVALID_TOKEN', message: 'Nieprawidłowy token' }
      ], 401);
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
      mockedAuthService.googleAuthentication.mockResolvedValue(response);

      await googleAuth(mockReq, mockRes as any, mockNext);

      expect(mockedAuthService.googleAuthentication).toHaveBeenCalledWith(
        googleData.credential,
        googleData.rememberMe
      );
      expect(mockRes.success).toHaveBeenCalledWith(response, 'Logowanie przez Google zakończone pomyślnie');
    });

    it('should handle Google authentication errors', async () => {
      mockReq.body = { credential: 'invalid-token' };

      const error = new Error('Nieprawidłowy token Google');
      mockedAuthService.googleAuthentication.mockRejectedValue(error);

      await googleAuth(mockReq, mockRes as any, mockNext);

      expect(mockRes.fail).toHaveBeenCalledWith('Błąd uwierzytelniania przez Google', [
        { code: 'GOOGLE_AUTH_ERROR', message: error.message || 'Błąd uwierzytelniania przez Google' }
      ]);
    });
  });

  describe('logout controller', () => {
    it('should clear the JWT cookie and return success message', async () => {
      await logout(mockReq, mockRes as any, mockNext);

      expect(mockRes.clearCookie).toHaveBeenCalledWith('jwt', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
      });
      expect(mockRes.success).toHaveBeenCalledWith(null, 'Wylogowanie zakończone pomyślnie');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
}); 