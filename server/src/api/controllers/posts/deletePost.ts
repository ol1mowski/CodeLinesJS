// @ts-nocheck
  import { Post } from "../../../models/post.model.js";
  import { ValidationError } from "../../../utils/errors.js";

export const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const post = await Post.findById(id);
    
    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }
    
    if (post.author.toString() !== userId) {
      throw new ValidationError("Nie masz uprawnień do usunięcia tego posta");
    }
    
    await Post.findByIdAndDelete(id);
    
    res.json({
      message: "Post został usunięty"
    });
  } catch (error) {
    next(error);
  }
}; 