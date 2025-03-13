import { Post } from "../../models/post.model.js";
import { ValidationError } from "../../utils/errors.js";

export const getCommentsController = async (req, res, next) => {
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
}

