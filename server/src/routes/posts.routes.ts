import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getPostsController, 
  createPostController, 
  likePostController, 
  getCommentsController,
  addCommentController   
} from '../api/controllers/posts/index.js';

const router = express.Router();

router.get('/', authMiddleware, getPostsController);
router.post('/', authMiddleware, createPostController);
router.put('/:id/like', authMiddleware, likePostController);
router.get('/:id/comments', getCommentsController);
router.post('/:id/comments', authMiddleware, addCommentController);

export default router; 