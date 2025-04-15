import { Post } from '../../models/post.model.js';
import { User } from '../../models/user.model.js';
import { Types } from 'mongoose';
import { ValidationError } from '../../utils/errors.js';
import { PostQuery, PaginationOptions, IPost } from './types.js';

export class PostRepository {
  static async findAll(query: PostQuery, options: PaginationOptions): Promise<any> {
    // @ts-ignore - paginate jest dodawane przez plugin, ale TypeScript tego nie widzi
    return Post.paginate(query, options);
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

  static async incrementLikes(postId: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    return post as unknown as IPost;
  }

  static async decrementLikes(postId: string): Promise<IPost | null> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new ValidationError('Nieprawidłowy format ID posta');
    }
    
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },
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
    console.log("[incrementPostCount] Próba zwiększenia liczby postów dla użytkownika:", userId);
    console.log("[incrementPostCount] Typ userId:", typeof userId);
    console.log("[incrementPostCount] Walidacja ID:", Types.ObjectId.isValid(userId));
    
    if (!userId) {
      console.error("[incrementPostCount] userId jest puste lub undefined");
      throw new ValidationError('Brak ID użytkownika');
    }
    
    if (!Types.ObjectId.isValid(userId)) {
      console.error("[incrementPostCount] Nieprawidłowy format ID użytkownika:", userId);
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    try {
      const result = await User.findByIdAndUpdate(
        userId,
        { $inc: { postsCount: 1 } }
      );
      console.log("[incrementPostCount] Rezultat operacji:", result ? "Sukces" : "Użytkownik nie znaleziony");
      return result;
    } catch (error) {
      console.error("[incrementPostCount] Błąd podczas aktualizacji:", error);
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