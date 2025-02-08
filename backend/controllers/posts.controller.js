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
      likes: {
        count: 0,
        userIds: []
      },
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
    const userId = req.user.userId;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      throw new ValidationError('Post nie istnieje');
    }

    if (!post.likes) {
      post.likes = {
        count: 0,
        userIds: []
      };
    }

    if (!post.likes.userIds) {
      post.likes.userIds = [];
    }

    if (typeof post.likes.count !== 'number') {
      post.likes.count = 0;
    }

    const hasLiked = post.likes.userIds.some(id => id.toString() === userId.toString());
    const isLiked = Boolean(req.body.isLiked);

    if (isLiked && !hasLiked) {
      post.likes.userIds.push(userId);
      post.likes.count += 1;
    } else if (!isLiked && hasLiked) {
      post.likes.userIds = post.likes.userIds.filter(id => id.toString() !== userId.toString());
      post.likes.count = Math.max(0, post.likes.count - 1);
    }

    post.markModified('likes');
    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username avatar')
      .populate({
        path: 'comments.author',
        select: 'username avatar'
      });

    res.json({
      ...populatedPost.toObject(),
      isLiked: post.likes.userIds.some(id => id.toString() === userId.toString())
    });
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