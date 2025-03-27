import { Post } from "../../models/post.model.js";
import { ValidationError } from "../../utils/errors.js";

export const updatePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;
    const userId = req.user.userId;
    
    const post = await Post.findById(id);
    
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    if (post.author.toString() !== userId) {
      throw new ValidationError("Nie masz uprawnień do edycji tego posta");
    }
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.updatedAt = new Date();
    
    await post.save();
    
    const updatedPost = await Post.findById(id)
      .populate("author", "username avatar")
      .populate("comments.author", "username avatar");
      
    res.json({
      message: "Post został zaktualizowany",
      post: updatedPost
    });
  } catch (error) {
    next(error);
  }
}; 