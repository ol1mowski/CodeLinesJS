// @ts-nocheck
import { Post } from "../../../models/post.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const addCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;
    
    if (!content || content.trim().length === 0) {
      throw new ValidationError("Treść komentarza jest wymagana");
    }
    
    const post = await Post.findById(id);
    
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    post.comments.push({
      author: userId,
      content,
      createdAt: new Date()
    });
    
    await post.save();
    
    const updatedPost = await Post.findById(id)
      .populate("author", "username avatar")
      .populate("comments.author", "username avatar");
      
    const newComment = updatedPost.comments[updatedPost.comments.length - 1];
    
    res.status(201).json({
      message: "Komentarz został dodany",
      comment: newComment
    });
  } catch (error) {
    next(error);
  }
}; 