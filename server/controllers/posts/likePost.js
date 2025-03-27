import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { ValidationError } from "../../utils/errors.js";

export const likePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const post = await Post.findById(id);
    
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    const user = await User.findById(userId);
    
    const isLiked = user.likedPosts.includes(id);
    
    if (isLiked) {
      user.likedPosts = user.likedPosts.filter(
        postId => postId.toString() !== id
      );
      post.likes -= 1;
    } else {
      user.likedPosts.push(id);
      post.likes += 1;
    }
    
    await Promise.all([user.save(), post.save()]);
    
    res.json({
      message: isLiked ? "Polubienie zostało usunięte" : "Post został polubiony",
      isLiked: !isLiked,
      likes: post.likes
    });
  } catch (error) {
    next(error);
  }
}; 