import { Application } from 'express';
import { Server } from 'http';
import { env } from './env.validator.js';

declare global {
  var server: Server | undefined;
}

export const startServer = (app: Application, port: number): Server => {
  const server = app.listen(port, () => {
    console.log(`Serwer uruchomiony w trybie ${env.NODE_ENV} na porcie ${port}`);
  });
  
  global.server = server;
  
  return server;
}; 