import { Post } from "../../../models/post.model.js";
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const post = await Post.findOne({ _id: id, isPublished: true })
      .populate("author", "username avatar")
      .populate("comments.author", "username avatar");
      
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    const user = await User.findById(userId).select("savedPosts likedPosts");
    
    const isSaved = user.savedPosts.includes(post._id);
    const isLiked = user.likedPosts.includes(post._id);
    
    const formattedPost = {
      ...post.toObject(),
      isSaved,
      isLiked,
      commentsCount: post.comments.length
    };
    
    res.json(formattedPost);
  } catch (error) {
    next(error);
  }
}; 