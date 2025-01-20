import { Post } from '../models/post.model.js';

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name avatar'),
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
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      author: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post nie istnieje' });
    }

    const userLikeIndex = post.likes.indexOf(req.user.id);
    if (userLikeIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(userLikeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('comments')
      .select('comments');
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post nie istnieje' });
    }

    const comment = {
      content: req.body.content,
      author: req.user.id,
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 