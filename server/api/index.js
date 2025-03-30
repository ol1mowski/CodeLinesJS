// Punkt wejściowy dla funkcji serverless Vercel
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importujemy moduły aplikacji z katalogu dist
import { configureServer } from '../dist/config/server.config.js';
import { connectDB } from '../dist/config/db.config.js';
import { configureRoutes } from '../dist/routes/index.js';
import { configureGoogleSignIn } from '../dist/middleware/google.middleware.js';
import errorHandler from '../dist/middleware/error.middleware.js';

// Inicjalizacja aplikacji Express
const app = express();

// Podstawowa diagnostyka
app.get('/diagnostic', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Diagnostyka serwera działa',
    env: process.env.NODE_ENV,
    mongodb_uri: process.env.MONGODB_URI ? 'Skonfigurowane' : 'Brak konfiguracji'
  });
});

// Konfiguracja CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400
}));

// Obsługa preflight requests
app.options('*', (req, res) => {
  console.log(`Obsługa OPTIONS dla: ${req.originalUrl}`);
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

// Logowanie requestów API
app.use('/api', (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Konfiguracja plików statycznych
const publicPath = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Konfiguracja middlewares i routes
configureServer(app);
configureRoutes(app);
configureGoogleSignIn(app);
app.use(errorHandler);

// Obsługa ścieżek SPA (dla React Router)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Sprawdź, czy żądanie dotyczy pliku statycznego
  const staticFileExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.json'];
  const isStaticFile = staticFileExtensions.some(ext => req.path.endsWith(ext));
  
  if (isStaticFile) {
    const filePath = path.join(publicPath, req.path);
    return res.sendFile(filePath, err => {
      if (err) next();
    });
  }
  
  // Jeśli to nie jest plik statyczny ani endpoint API, serwuj index.html
  res.sendFile(path.join(publicPath, 'index.html'), err => {
    if (err) {
      console.error('Błąd podczas serwowania index.html:', err);
      res.status(500).send('Błąd serwera');
    }
  });
});

// Podłączenie do bazy danych
connectDB();

// Eksport funkcji serverless dla Vercel
export default app; 