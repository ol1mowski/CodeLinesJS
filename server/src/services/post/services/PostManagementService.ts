import { PostRepository, UserRepository } from '../post.repository.js';
import { PostMapper } from '../post.mapper.js';
import { ValidationError } from '../../../utils/errors.js';
import { PostResponse } from '../types.js';
import { Types } from 'mongoose';
import { ContentValidator } from '../validators/ContentValidator.js';
import { ContentSanitizer } from '../strategies/ContentSanitizer.js';

export class PostManagementService {
  private static contentValidator = new ContentValidator();
  private static contentSanitizer = new ContentSanitizer();
  
  static async createPost(content: string, userId: string): Promise<PostResponse> {
    console.log("[PostManagementService.createPost] Rozpoczęcie tworzenia posta");
    console.log("[PostManagementService.createPost] userId:", userId);
    console.log("[PostManagementService.createPost] Typ userId:", typeof userId);
    
    this.contentValidator.validate(content);
    
    const sanitizedContent = this.contentSanitizer.sanitize(content);
    
    try {
      console.log("[PostManagementService.createPost] Przed utworzeniem posta");
      
      // Sprawdzenie poprawności userId przed użyciem
      if (!userId || typeof userId !== 'string') {
        console.error("[PostManagementService.createPost] Nieprawidłowy userId:", userId);
        throw new ValidationError('Nieprawidłowy identyfikator użytkownika');
      }
      
      // Próba konwersji userId na ObjectId dla walidacji
      let userObjectId;
      try {
        userObjectId = new Types.ObjectId(userId);
        console.log("[PostManagementService.createPost] Konwersja userId do ObjectId udana:", userObjectId);
      } catch (error) {
        console.error("[PostManagementService.createPost] Błąd konwersji userId do ObjectId:", error);
        throw new ValidationError('Nieprawidłowy format ID użytkownika');
      }
      
      const post = await PostRepository.create({
        content: sanitizedContent,
        author: userObjectId,
        isPublished: true
      });
      
      console.log("[PostManagementService.createPost] Post utworzony:", post._id.toString());
      console.log("[PostManagementService.createPost] Przed zwiększeniem licznika postów użytkownika");
      
      await UserRepository.incrementPostCount(userId);
      
      console.log("[PostManagementService.createPost] Po zwiększeniu licznika postów użytkownika");
      
      const populatedPost = await PostRepository.findById(post._id.toString());
      
      return PostMapper.toPostResponse(populatedPost, false, false);
    } catch (error) {
      console.error("[PostManagementService.createPost] Błąd podczas tworzenia posta:", error);
      throw error;
    }
  }
  
  static async updatePost(postId: string, content: string, userId: string): Promise<PostResponse> {
    const post = await PostRepository.findById(postId);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    if (post.author._id.toString() !== userId) {
      throw new ValidationError('Nie masz uprawnień do edytowania tego posta');
    }
    
    this.contentValidator.validate(content);
    
    const sanitizedContent = this.contentSanitizer.sanitize(content);
    
    const updatedPost = await PostRepository.update(postId, {
      content: sanitizedContent
    });
    
    const user = await UserRepository.findUserPostInfo(userId);
    
    const isLiked = user.likedPosts.some(id => id.toString() === postId);
    const isSaved = user.savedPosts.some(id => id.toString() === postId);
    
    return PostMapper.toPostResponse(updatedPost, isLiked, isSaved);
  }
  
  static async deletePost(postId: string, userId: string): Promise<void> {
    const post = await PostRepository.findById(postId);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    if (post.author._id.toString() !== userId) {
      throw new ValidationError('Nie masz uprawnień do usunięcia tego posta');
    }
    
    await PostRepository.delete(postId);
    await UserRepository.decrementPostCount(userId);
  }
} 