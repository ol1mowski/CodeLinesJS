import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getPostsController, 
  createPostController, 
  likePostController, 
  getCommentsController,
  addCommentController,
  updatePostController,
  deletePostController,
  getPostByIdController,
  savePostController,
  deleteCommentController
} from '../api/controllers/posts/index.js';
import { Post } from '../models/post.model.js';

const router = express.Router();


router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({ path: 'author', select: 'username avatar' })
      .limit(20)
      .sort({ createdAt: -1 });
    
    
    res.json({
      status: 'success',
      posts: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('[posts.routes] Błąd podczas pobierania wszystkich postów:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authMiddleware, getPostsController);
router.post('/', authMiddleware, createPostController);
router.get('/:postId', authMiddleware, getPostByIdController);
router.put('/:postId', authMiddleware, updatePostController);
router.delete('/:postId', authMiddleware, deletePostController);
router.put('/:postId/like', authMiddleware, likePostController);
router.put('/:postId/save', authMiddleware, savePostController);
router.get('/:postId/comments', authMiddleware, getCommentsController);
router.post('/:postId/comments', authMiddleware, addCommentController);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteCommentController);

export default router; 