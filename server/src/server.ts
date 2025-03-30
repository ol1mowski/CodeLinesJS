import express, { Application, Request, Response } from "express";
import { configureServer } from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";
import { configureRoutes } from "./routes/index.js";
import { configureGoogleSignIn } from "./middleware/google.middleware.js";
import { configureStaticFiles } from "./middleware/static.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import cors from "cors";

const app: Application = express();

// Dodajemy podstawowy endpoint diagnostyczny, który powinien zawsze odpowiadać
app.get('/diagnostic', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Diagnostyka serwera działa',
    env: process.env.NODE_ENV,
    mongodb_uri: process.env.MONGODB_URI ? 'Skonfigurowane' : 'Brak konfiguracji'
  });
});

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400
}));

app.options('*', (req: Request, res: Response) => {
  console.log(`Obsługa OPTIONS dla: ${req.originalUrl}`);
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

app.use('/api', (req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

configureServer(app);

configureRoutes(app);

configureGoogleSignIn(app);

configureStaticFiles(app);

app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || "5001", 10);

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

connectDB(); 