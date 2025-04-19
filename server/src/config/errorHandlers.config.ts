import { Application, Request, Response } from 'express';

export const setupErrorHandlers = (app: Application): void => {
  process.on('uncaughtException', (err) => {
    console.error('NIEOBSŁUŻONY WYJĄTEK! Zamykanie...');
    console.error(err.name, err.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (err: Error) => {
    console.error('NIEOBSŁUŻONE ODRZUCENIE PROMISE! Zamykanie...');
    console.error(err.name, err.message);
    if (global.server) {
      global.server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  process.on('SIGTERM', () => {
    console.log('Otrzymano SIGTERM. Zamykanie serwera...');
    if (global.server) {
      global.server.close(() => {
        console.log('Serwer zamknięty.');
      });
    }
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      message: `Nie znaleziono trasy: ${req.originalUrl}`
    });
  });
}; 