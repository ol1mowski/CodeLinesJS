// @ts-nocheck
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configureStaticFiles = (app: Application): Application => {
  // Określ ścieżkę do plików statycznych - sprawdź, czy jesteśmy na Vercel
  const isVercel = process.env.VERCEL === '1';
  const publicPath = isVercel ? path.join(__dirname, '../public') : path.join(__dirname, '../../public');
  
  console.log(`Ścieżka do plików statycznych: ${publicPath}`);
  
  app.get(['/auth/google/callback', '/login/google/callback', '/oauth/google/callback'], (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
  
  app.use(express.static(publicPath, {
    maxAge: '1d',
    setHeaders: (res: Response, filePath: string) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
  
  app.get([
    '/assets/*',
    '*.js',
    '*.css',
    '*.png',
    '*.svg',
    '*.ico',
    '*.json',
    '/favicon.ico',
    '/manifest.json'
  ], (req: Request, res: Response, next: NextFunction) => {
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
  });
  
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    console.log(`Serving index.html for path: ${req.path}`);
    console.log(`Full path: ${path.join(publicPath, 'index.html')}`);
    
    res.sendFile(path.join(publicPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Błąd serwera');
      }
    });
  });
  
  return app;
}; 