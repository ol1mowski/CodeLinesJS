import { Post } from "../../../models/post.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const deleteCommentController = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);

    if (!post) {
      throw new ValidationError("Post nie został znaleziony");
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      throw new ValidationError("Komentarz nie został znaleziony");
    }

    if (
      comment.author.toString() !== userId &&
      post.author.toString() !== userId
    ) {
      throw new ValidationError(
        "Nie masz uprawnień do usunięcia tego komentarza"
      );
    }

    comment.remove();
    await post.save();

    res.json({
      message: "Komentarz został usunięty",
    });
  } catch (error) {
    next(error);
  }
};
