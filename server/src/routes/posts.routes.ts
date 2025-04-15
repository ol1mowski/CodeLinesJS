// @ts-nocheck
import express from 'express';
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

// Dodaję logi do diagnostyki
router.use((req, res, next) => {
  console.log(`[posts.routes] Request: ${req.method} ${req.url}`);
  next();
});

// Dodaję prosty endpoint testowy, który zwraca wszystkie posty bez filtrowania
router.get('/all', async (req, res) => {
  try {
    console.log('[posts.routes] Pobieranie wszystkich postów (testowe)');
    const posts = await Post.find({})
      .populate({ path: 'author', select: 'username avatar' })
      .limit(20)
      .sort({ createdAt: -1 });
    
    console.log('[posts.routes] Znaleziono postów (testowe):', posts.length);
    
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

// Zmieniam ścieżki na poprawne (z 'id' na 'postId')
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

// Dodaję prosty endpoint do testowego tworzenia posta
router.post('/test-create', async (req, res) => {
  try {
    console.log('[posts.routes] Testowe tworzenie posta');
    console.log('[posts.routes] Body:', req.body);
    
    if (!req.body.content || !req.body.authorId) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Wymagane pola: content, authorId'
      });
    }

    const post = new Post({
      content: req.body.content,
      author: req.body.authorId,
    });
    
    await post.save();
    console.log('[posts.routes] Testowy post utworzony:', post._id);
    
    res.status(201).json({
      status: 'success',
      message: 'Testowy post utworzony',
      post: post
    });
  } catch (error) {
    console.error('[posts.routes] Błąd podczas tworzenia testowego posta:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router; 