import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import groupsRoutes from "./routes/groups.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import trendingRoutes from "./routes/trending.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import postsRoutes from './routes/posts.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/posts", postsRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
