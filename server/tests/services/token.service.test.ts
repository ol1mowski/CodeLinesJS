import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TokenService } from '../../src/services/token.service.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mocked-jwt-token'),
    verify: vi.fn().mockReturnValue({ userId: 'user-123' }),
    decode: vi.fn().mockReturnValue({
      email: 'google@example.com',
      name: 'Google User',
      picture: 'profile.jpg',
      sub: 'google-123'
    })
  }
}));

vi.mock('crypto', () => ({
  default: {
    randomBytes: vi.fn().mockImplementation(() => ({
      toString: vi.fn().mockReturnValue('mock-hex-token')
    })),
    createHash: vi.fn().mockImplementation(() => ({
      update: vi.fn().mockReturnThis(),
      digest: vi.fn().mockReturnValue('hashed-token')
    }))
  }
}));

describe('TokenService', () => {
  let tokenService;
  const mockUser = {
    _id: 'user-123',
    email: 'test@example.com',
    username: 'testuser',
    accountType: 'local',
    role: 'user'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    process.env.JWT_SECRET = 'test-secret-key';
    
    tokenService = new TokenService();
  });

  afterEach(() => {
    vi.resetAllMocks();
    delete process.env.JWT_SECRET;
  });

  describe('generateToken', () => {
    it('should generate JWT token with correct user data', () => {
      const token = tokenService.generateToken(mockUser);
      
      expect(jwt.sign).toHaveBeenCalled();
      
      const [payload, secret, options] = vi.mocked(jwt.sign).mock.calls[0];
      
      expect(payload).toEqual(expect.objectContaining({
        userId: mockUser._id,
        email: mockUser.email,
        username: mockUser.username,
        accountType: mockUser.accountType,
        role: mockUser.role
      }));
      
      expect(options).toEqual(expect.objectContaining({
        expiresIn: expect.any(String),
        algorithm: 'HS256'
      }));
      
      expect(token).toBe('mocked-jwt-token');
    });

    it('should handle different token expiration times', () => {
      tokenService.generateToken(mockUser, '30d');
      
      const options = vi.mocked(jwt.sign).mock.calls[0][2];
      expect(options.expiresIn).toBe('30d');
    });

    it('should handle user ID as an object', () => {
      const userWithObjectId = {
        ...mockUser,
        _id: { toString: () => 'user-123' }
      };
      
      tokenService.generateToken(userWithObjectId);
      
      const payload = vi.mocked(jwt.sign).mock.calls[0][0] as any;
      expect(payload.userId).toBe('user-123');
    });

    it('should handle JWT signing errors', () => {
      vi.mocked(jwt.sign).mockImplementationOnce(() => {
        throw new Error('JWT signing error');
      });
      
      expect(() => tokenService.generateToken(mockUser)).toThrow('Nie można wygenerować tokenu');
    });
  });

  describe('generatePasswordResetToken', () => {
    it('should generate password reset token', () => {
      const result = tokenService.generatePasswordResetToken();
      
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
      
      expect(result).toEqual({
        resetToken: 'mock-hex-token',
        hashedToken: 'hashed-token',
        expiresIn: expect.any(Number)
      });
      
      expect(result.expiresIn).toBeGreaterThan(Date.now());
    });
  });

  describe('verifyToken', () => {
    it('should verify token correctly', () => {
      const result = tokenService.verifyToken('valid-token');
      
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(Buffer));
      expect(result).toEqual({ userId: 'user-123' });
    });

    it('should handle token verification errors', () => {
      vi.mocked(jwt.verify).mockImplementationOnce(() => {
        throw new Error('Token verification error');
      });
      
      const result = tokenService.verifyToken('invalid-token');
      
      expect(result).toBeNull();
    });
  });

  describe('decodeGoogleToken', () => {
    it('should decode Google token', () => {
      const result = tokenService.decodeGoogleToken('google-token');
      
      expect(jwt.decode).toHaveBeenCalledWith('google-token');
      expect(result).toEqual({
        email: 'google@example.com',
        name: 'Google User',
        picture: 'profile.jpg',
        sub: 'google-123'
      });
    });

    it('should handle token decoding errors', () => {
      vi.mocked(jwt.decode).mockImplementationOnce(() => {
        throw new Error('Token decoding error');
      });
      
      const result = tokenService.decodeGoogleToken('invalid-token');
      
      expect(result).toBeNull();
    });
  });
}); 