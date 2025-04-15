import { Post } from '../../models/post.model.js';
import { User } from '../../models/user.model.js';
import { Types } from 'mongoose';
import { ValidationError } from '../../utils/errors.js';
import { PostQuery, PaginationOptions, IPost } from './types.js';

export class PostRepository {
  static async findAll(query: PostQuery, options: PaginationOptions): Promise<any> {
    
    try {
      // @ts-ignore - paginate jest dodawane przez plugin, ale TypeScript tego nie widzi
      const result = await Post.paginate(query, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findById(id)
      .populate({
        path: 'author',
        select: 'username accountType avatar'
      })
      .populate({
        path: 'comments.author',
        select: 'username avatar'
      });
    
    return post as unknown as IPost;
  }

  static async create(data: Partial<IPost>): Promise<IPost> {
    const post = await Post.create(data);
    return post as unknown as IPost;
  }

  static async update(id: string, data: Partial<IPost>): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findByIdAndUpdate(id, data, { new: true })
      .populate({
        path: 'author',
        select: 'username accountType avatar'
      });
    
    return post as unknown as IPost;
  }

  static async delete(id: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findByIdAndDelete(id);
    return post as unknown as IPost;
  }

  static async addComment(postId: string, comment: any): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    ).populate({
      path: 'comments.author',
      select: 'username avatar'
    });
    
    return post as unknown as IPost;
  }

  static async removeComment(postId: string, commentId: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    
    return post as unknown as IPost;
  }

  static async incrementLikes(postId: string, userId?: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const update: any = { $inc: { 'likes.count': 1 } };
    
    // Jeśli podano userId, dodaj go do listy userIds
    if (userId && Types.ObjectId.isValid(userId)) {
      update.$addToSet = { 'likes.userIds': new Types.ObjectId(userId) };
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );
    
    return post as unknown as IPost;
  }

  static async decrementLikes(postId: string, userId?: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const update: any = { $inc: { 'likes.count': -1 } };
    
    // Jeśli podano userId, usuń go z listy userIds
    if (userId && Types.ObjectId.isValid(userId)) {
      update.$pull = { 'likes.userIds': new Types.ObjectId(userId) };
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );
    
    return post as unknown as IPost;
  }

  static async updateLikeStatus(postId: string, userId: string, isLiked: boolean): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    const update = isLiked 
      ? { $addToSet: { 'likes.userIds': new Types.ObjectId(userId) } }
      : { $pull: { 'likes.userIds': new Types.ObjectId(userId) } };
    
    const post = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );
    
    return post as unknown as IPost;
  }
}

export class UserRepository {
  static async findById(userId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    return User.findById(userId);
  }

  static async findUserPostInfo(userId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    return User.findById(userId).select('savedPosts likedPosts');
  }

  static async incrementPostCount(userId: string): Promise<any> {
    
    if (!userId) {
      throw new ValidationError('Brak ID użytkownika');
    }
    
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    try {
      const result = await User.findByIdAndUpdate(
        userId,
        { $inc: { postsCount: 1 } }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async decrementPostCount(userId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    return User.findByIdAndUpdate(
      userId,
      { $inc: { postsCount: -1 } }
    );
  }

  static async addLikedPost(userId: string, postId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedPosts: postId } }
    );
  }

  static async removeLikedPost(userId: string, postId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    return User.findByIdAndUpdate(
      userId,
      { $pull: { likedPosts: postId } }
    );
  }

  static async addSavedPost(userId: string, postId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedPosts: postId } }
    );
  }

  static async removeSavedPost(userId: string, postId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID');
    }
    
    return User.findByIdAndUpdate(
      userId,
      { $pull: { savedPosts: postId } }
    );
  }
} 