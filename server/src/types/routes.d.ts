import { Router } from 'express';

// Deklaracje typów dla wszystkich routerów
declare module "*.routes.js" {
  const router: Router;
  export default router;
} 