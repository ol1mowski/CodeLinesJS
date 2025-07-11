import { createHash } from 'crypto';

import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

export const theoryQuestionsRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const userKey = req.user?.userId || 'anonymous';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `theory_questions_${createHash('sha256').update(`${ip}:${userKey}`).digest('hex')}`;
  },
  message: {
    success: false,
    message: 'Zbyt wiele żądań do pytań teoretycznych. Spróbuj ponownie za 5 minut.',
    retryAfter: 300,
  },
  handler: (req: Request, res: Response) => {
    console.warn(
      `⚠️  Rate limit reached for theory questions - IP: ${req.ip}, User: ${req.user?.userId || 'anonymous'}, Time: ${new Date().toISOString()}`,
    );
    res.status(429).json({
      success: false,
      message: 'Zbyt wiele żądań do pytań teoretycznych. Spróbuj ponownie za 5 minut.',
      retryAfter: 300,
    });
  },
});

export const checkAnswerRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const userKey = req.user?.userId || 'anonymous';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `check_answer_${createHash('sha256').update(`${ip}:${userKey}`).digest('hex')}`;
  },
  message: {
    success: false,
    message: 'Zbyt wiele prób sprawdzania odpowiedzi. Spróbuj ponownie za minutę.',
    retryAfter: 60,
  },
  handler: (req: Request, res: Response) => {
    console.warn(
      `🚨 BRUTE FORCE ATTEMPT - Answer checking rate limit reached - IP: ${req.ip}, User: ${req.user?.userId || 'anonymous'}, Question: ${req.params.id}, Time: ${new Date().toISOString()}`,
    );
    res.status(429).json({
      success: false,
      message: 'Zbyt wiele prób sprawdzania odpowiedzi. Spróbuj ponownie za minutę.',
      retryAfter: 60,
    });
  },
});

export const validateAndSanitizeParams = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: 'Nieprawidłowy format identyfikatora pytania',
        });
      }

      if (req.params.id.length !== 24) {
        return res.status(400).json({
          success: false,
          message: 'Nieprawidłowa długość identyfikatora pytania',
        });
      }
    }

    if (req.query.limit) {
      const limit = parseInt(req.query.limit as string, 10);
      if (isNaN(limit) || limit < 1 || limit > 50) {
        return res.status(400).json({
          success: false,
          message: 'Parametr limit musi być liczbą między 1 a 50',
        });
      }
      req.query.limit = limit.toString();
    }

    if (req.body && typeof req.body.answer !== 'undefined') {
      const answer = parseInt(req.body.answer, 10);
      if (isNaN(answer) || answer < 0 || answer > 3) {
        return res.status(400).json({
          success: false,
          message: 'Odpowiedź musi być liczbą między 0 a 3',
        });
      }
      req.body.answer = answer;
    }

    next();
  } catch (error) {
    console.error('🔒 Security validation error:', error);
    return res.status(400).json({
      success: false,
      message: 'Błąd walidacji danych wejściowych',
    });
  }
};

export const sanitizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body: any) {
    if (body && body.data) {
      if (body.data.correctAnswer !== undefined && req.path !== '/check') {
        delete body.data.correctAnswer;
        delete body.data.explanation;
      }

      if (Array.isArray(body.data)) {
        body.data = body.data.map((question: any) => {
          if (question.correctAnswer !== undefined) {
            const { correctAnswer, explanation, ...safeQuestion } = question;
            return safeQuestion;
          }
          return question;
        });
      }
    }

    return originalJson.call(this, body);
  };

  next();
};

export const auditLogger = (action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    const logData = {
      timestamp: new Date().toISOString(),
      action,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      userId: req.user?.userId || 'anonymous',
      userEmail: req.user?.email || 'anonymous',
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      questionId: req.params.id || null,
    };

    console.log(`🔍 AUDIT [${action}]:`, JSON.stringify(logData));

    const originalJson = res.json;
    res.json = function (body: any) {
      const responseTime = Date.now() - startTime;

      const responseLog = {
        ...logData,
        responseTime: `${responseTime}ms`,
        statusCode: res.statusCode,
        success: body?.success || false,
        errorMessage: body?.message || null,
      };

      if (res.statusCode >= 400) {
        console.warn(`⚠️  AUDIT ERROR [${action}]:`, JSON.stringify(responseLog));
      } else {
        console.log(`✅ AUDIT SUCCESS [${action}]:`, JSON.stringify(responseLog));
      }

      return originalJson.call(this, body);
    };

    next();
  };
};

export const dosProtection = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.limit) {
    const limit = parseInt(req.query.limit as string, 10);

    if (!req.user && limit > 10) {
      return res.status(403).json({
        success: false,
        message:
          'Niezalogowani użytkownicy mogą pobrać maksymalnie 10 pytań. Zaloguj się, aby uzyskać więcej.',
      });
    }

    if (limit > 50) {
      return res.status(400).json({
        success: false,
        message: 'Maksymalny limit to 50 pytań',
      });
    }
  }

  next();
};

export const originValidator = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://codelinesjs.pl',
    'https://www.codelinesjs.pl',
  ];

  const origin = req.get('Origin') || req.get('Referer');

  if (req.method === 'POST' && origin) {
    const isAllowed = allowedOrigins.some((allowed) => origin.startsWith(allowed));
    if (!isAllowed) {
      console.warn(
        `🚨 SUSPICIOUS ORIGIN: ${origin} tried to access ${req.path} from IP: ${req.ip}`,
      );
      return res.status(403).json({
        success: false,
        message: 'Nieprawidłowe pochodzenie żądania',
      });
    }
  }

  next();
};

export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-API-Version', '1.0');

  if (req.path.includes('/check')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'private, max-age=300');
  }

  next();
};
