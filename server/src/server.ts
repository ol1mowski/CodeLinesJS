import express, { Application, Request, Response } from "express";
import { configureServer } from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";
import { configureRoutes } from "./routes/index.js";
import { configureGoogleSignIn } from "./middleware/google.middleware.js";
import { configureStaticFiles } from "./middleware/static.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app: Application = express();

// Obsługa CORS dla zapytań OPTIONS
app.options('*', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

// Logowanie wszystkich zapytań do API
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