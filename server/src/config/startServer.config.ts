import { Application } from 'express';
import { Server } from 'http';

declare global {
  var server: Server | undefined;
}

export const startServer = (app: Application, port: number): Server => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  global.server = server;
  
  return server;
}; 