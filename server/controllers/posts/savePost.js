import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { ValidationError } from "../../utils/errors.js";

export const savePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const post = await Post.findById(id);
    
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    const user = await User.findById(userId);
    
    const isSaved = user.savedPosts.includes(id);
    
    if (isSaved) {
      user.savedPosts = user.savedPosts.filter(
        postId => postId.toString() !== id
      );
    } else {
      user.savedPosts.push(id);
    }
    
    await user.save();
    
    res.json({
      message: isSaved ? "Post został usunięty z zapisanych" : "Post został zapisany",
      isSaved: !isSaved
    });
  } catch (error) {
    next(error);
  }
}; 