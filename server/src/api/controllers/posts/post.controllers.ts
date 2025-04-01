import { Post } from "../../../models/post.model.js";
import { User } from "../../../models/user.model.js";
import AppError from "../../../utils/appError.js";
import { Request, Response, NextFunction } from "express";

const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, 'nodata:');
};

const checkRequiredFields = (body: any, fields: string[]) => {
  for (const field of fields) {
    if (!body[field]) {
      throw new AppError(`Pole ${field} jest wymagane`, 400);
    }
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkRequiredFields(req.body, ['content']);

    if (req.body.content.length < 3) {
      return next(new AppError("Post musi zawierać co najmniej 3 znaki", 400));
    }
    
    if (req.body.content.length > 500) {
      return next(new AppError("Post nie może przekraczać 500 znaków", 400));
    }
    
    const sanitizedContent = sanitizeHtml(req.body.content);

    const post = await Post.create({
      content: sanitizedContent,
      author: req.user.id,
    });
    
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { postsCount: 1 },
    });

    const populatedPost = await Post.findById(post._id)
      .populate({
        path: "author",
        select: "username accountType avatar",
      });

    res.status(201).json({
      status: "success",
      data: populatedPost,
    });
  } catch (error) {
    next(error);
  }
}; 