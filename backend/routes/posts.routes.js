import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getPosts, 
  createPost, 
  likePost, 
  getComments,
  addComment 
} from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.post('/:id/like', authMiddleware, likePost);
router.get('/:id/comments', getComments);
router.post('/:id/comments', authMiddleware, addComment);

export default router; 