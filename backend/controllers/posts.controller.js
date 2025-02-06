import { Post } from '../models/post.model.js';
import { ValidationError } from '../utils/errors.js';

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'username avatar'),
      Post.countDocuments()
    ]);

    const hasNextPage = skip + posts.length < total;
    const nextPage = hasNextPage ? page + 1 : undefined;

    res.json({
      posts,
      hasNextPage,
      nextPage
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    if (!req.body.content) {
      throw new ValidationError('Treść posta jest wymagana');
    }

    const post = new Post({
      content: req.body.content,
      author: req.user.userId,
      likes: [],
      comments: []
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username avatar');

    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new ValidationError('Post nie istnieje');
    }

    const isLiked = post.likes.includes(req.user.userId);
    
    if (req.body.isLiked && !isLiked) {
      post.likes.push(req.user.userId);
    } else if (!req.body.isLiked && isLiked) {
      const index = post.likes.indexOf(req.user.userId);
      post.likes.splice(index, 1);
    }

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username avatar');

    res.json(populatedPost);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'comments.author',
        select: 'username avatar'
      })
      .select('comments');

    if (!post) {
      throw new ValidationError('Post nie istnieje');
    }

    res.json(post.comments);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    if (!req.body.content) {
      throw new ValidationError('Treść komentarza jest wymagana');
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new ValidationError('Post nie istnieje');
    }

    const comment = {
      content: req.body.content,
      author: req.user.userId,
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username avatar')
      .populate({
        path: 'comments.author',
        select: 'username avatar'
      });

    res.status(201).json(populatedPost.comments[populatedPost.comments.length - 1]);
  } catch (error) {
    next(error);
  }
}; 