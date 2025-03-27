import { Post } from "../../../models/post.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const createPostController = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    const userId = req.user.userId;
    
    if (!title || !content || !category) {
      throw new ValidationError("Tytuł, treść i kategoria są wymagane");
    }
    
    const post = await Post.create({
      title,
      content,
      category,
      tags: tags || [],
      author: userId,
      isPublished: true
    });
    
    const populatedPost = await Post.findById(post._id)
      .populate("author", "username avatar");
      
    res.status(201).json({
      message: "Post został utworzony",
      post: populatedPost
    });
  } catch (error) {
    next(error);
  }
}; 