import express, { Application } from "express";
import { configureServer } from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";
import { configureRoutes } from "./routes/index.js";
import { configureGoogleSignIn } from "./middleware/google.middleware.js";
import { configureStaticFiles } from "./middleware/static.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app: Application = express();

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