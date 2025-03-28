import express from 'express';
import authRoutes from "./auth.routes.js";
import statsRoutes from "./stats.routes.js";
import gamesRoutes from "./games.routes.js";
import groupsRoutes from "./groups.routes.js";
import rankingRoutes from "./ranking.routes.js";
import progressRoutes from "./progress.routes.js";
import postsRoutes from './posts.routes.js';
import settingsRoutes from './settings.routes.js';
import learningPathsRoutes from './learningPaths.routes.js';
import lessonsRoutes from './lessons.routes.js';
import resourcesRoutes from './resources.routes.js';
import usersRoutes from './users.routes.js';
import reportsRoutes from './reports.routes.js';

export const configureRoutes = (app) => {
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      environment: process.env.NODE_ENV,
      serverTime: new Date().toISOString()
    });
  });
  
  app.use("/api/auth", authRoutes);
  app.use("/api/stats", statsRoutes);
  app.use("/api/games", gamesRoutes);
  app.use("/api/groups", groupsRoutes);
  app.use("/api/ranking", rankingRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/posts", postsRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/learning-paths", learningPathsRoutes);
  app.use("/api/lessons", lessonsRoutes);
  app.use("/api/resources", resourcesRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/reports', reportsRoutes);
  
  app.all('/api/*', (req, res) => {
    console.log(`API endpoint not found: ${req.method} ${req.originalUrl}`);
    return res.status(404).json({ error: 'API endpoint not found' });
  });
  
  return app;
}; 