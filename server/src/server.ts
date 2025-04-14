import express, { Application, Request, Response } from "express";
import { configureServer } from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";
import { configureRoutes } from "./routes/index.js";
import { configureGoogleSignIn } from "./middleware/google.middleware.js";
import { configureStaticFiles } from "./middleware/static.middleware.js";
// import errorHandler from "./middleware/error.middleware.js";

const app: Application = express();

app.use('/api', (req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

configureServer(app);

configureRoutes(app);

configureGoogleSignIn(app);

configureStaticFiles(app);

// app.use(errorHandler);

// Dodaję prosty handler błędów, który tylko loguje i przekazuje surowe dane
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Surowy błąd:', err);
  res.status(err.statusCode || 500).json({
    error: err,
    message: err.message,
    stack: err.stack
  });
});

const PORT: number = parseInt(process.env.PORT || "5001", 10);

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

connectDB(); 