import path from 'path';
import { fileURLToPath } from 'url';

import express, { Application, Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configureStaticFiles = (app: Application): Application => {
  const isVercel = process.env.VERCEL === '1';

  if (isVercel) {
    console.log('Vercel environment detected - skipping static file middleware');
    return app;
  }

  const publicPath = path.join(__dirname, '../../public');

  app.get(
    ['/auth/google/callback', '/login/google/callback', '/oauth/google/callback'],
    (req: Request, res: Response) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    },
  );

  app.use(
    express.static(publicPath, {
      maxAge: '1d',
      setHeaders: (res: Response, filePath: string) => {
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      },
    }),
  );

  app.get(
    [
      '/assets/*',
      '*.js',
      '*.css',
      '*.png',
      '*.svg',
      '*.ico',
      '*.json',
      '/favicon.ico',
      '/manifest.json',
    ],
    (req: Request, res: Response, next: NextFunction) => {
      const filePath = path.join(publicPath, req.path);

      if (req.path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (req.path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (req.path.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      }

      res.sendFile(filePath, (err) => {
        if (err) {
          console.error(`Błąd przy dostarczaniu pliku ${req.path}:`, err);
          next();
        }
      });
    },
  );

  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    res.sendFile(path.join(publicPath, 'index.html'), (err) => {
      if (err) {
        res.status(500).send('Błąd serwera');
      }
    });
  });

  return app;
};
