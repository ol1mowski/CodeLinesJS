import { Router } from 'express';

declare module "*.routes.js" {
  const router: Router;
  export default router;
} 