import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configureStaticFiles = (app) => {
  app.get(['/auth/google/callback', '/login/google/callback', '/oauth/google/callback'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
  
  app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.css')) {
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
  ], (req, res, next) => {
    const filePath = path.join(__dirname, '../public', req.path);
    
    if (req.path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (req.path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
    
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  });
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    res.sendFile(path.join(__dirname, '../public', 'index.html'), (err) => {
      if (err) {
        res.status(500).send('Błąd serwera');
      }
    });
  });
  
  return app;
}; 