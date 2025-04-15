import { PostRepository, UserRepository } from '../post.repository.js';
import { PostMapper } from '../post.mapper.js';
import { ValidationError } from '../../../utils/errors.js';
import { PostResponse } from '../types.js';
import { Types } from 'mongoose';
import { ContentValidator } from '../validators/ContentValidator.js';
import { ContentSanitizer } from '../strategies/ContentSanitizer.js';

export class PostInteractionService {
  private static commentValidator = new ContentValidator(3, 200, 'Komentarz');
  private static contentSanitizer = new ContentSanitizer();
  
  static async likePost(postId: string, userId: string): Promise<PostResponse> {
    const [post, user] = await Promise.all([
      PostRepository.findById(postId),
      UserRepository.findUserPostInfo(userId)
    ]);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }

    if (!user) {
      throw new ValidationError('Użytkownik nie został znaleziony');
    }
    
    const likedPosts = Array.isArray(user.likedPosts) ? user.likedPosts : [];
    const isLiked = likedPosts.some(id => id && id.toString() === postId);
    
    if (isLiked) {
      await Promise.all([
        PostRepository.decrementLikes(postId),
        UserRepository.removeLikedPost(userId, postId)
      ]);
    } else {
      await Promise.all([
        PostRepository.incrementLikes(postId),
        UserRepository.addLikedPost(userId, postId)
      ]);
    }
    
    const updatedPost = await PostRepository.findById(postId);
    const updatedUser = await UserRepository.findUserPostInfo(userId);
    
    if (!updatedUser) {
      throw new ValidationError('Nie można zaktualizować informacji o użytkowniku');
    }

    const updatedLikedPosts = Array.isArray(updatedUser.likedPosts) ? updatedUser.likedPosts : [];
    const updatedSavedPosts = Array.isArray(updatedUser.savedPosts) ? updatedUser.savedPosts : [];
    
    const newIsLiked = updatedLikedPosts.some(id => id && id.toString() === postId);
    const isSaved = updatedSavedPosts.some(id => id && id.toString() === postId);
    
    return PostMapper.toPostResponse(updatedPost, newIsLiked, isSaved);
  }
  
  static async savePost(postId: string, userId: string): Promise<PostResponse> {
    const [post, user] = await Promise.all([
      PostRepository.findById(postId),
      UserRepository.findUserPostInfo(userId)
    ]);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }

    if (!user) {
      throw new ValidationError('Użytkownik nie został znaleziony');
    }
    
    const savedPosts = Array.isArray(user.savedPosts) ? user.savedPosts : [];
    const isSaved = savedPosts.some(id => id && id.toString() === postId);
    
    if (isSaved) {
      await UserRepository.removeSavedPost(userId, postId);
    } else {
      await UserRepository.addSavedPost(userId, postId);
    }
    
    const updatedUser = await UserRepository.findUserPostInfo(userId);
    
    if (!updatedUser) {
      throw new ValidationError('Nie można zaktualizować informacji o użytkowniku');
    }

    const updatedLikedPosts = Array.isArray(updatedUser.likedPosts) ? updatedUser.likedPosts : [];
    const updatedSavedPosts = Array.isArray(updatedUser.savedPosts) ? updatedUser.savedPosts : [];
    
    const isLiked = updatedLikedPosts.some(id => id && id.toString() === postId);
    const newIsSaved = updatedSavedPosts.some(id => id && id.toString() === postId);
    
    return PostMapper.toPostResponse(post, isLiked, newIsSaved);
  }
  
  static async addComment(postId: string, content: string, userId: string): Promise<PostResponse> {
    const post = await PostRepository.findById(postId);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    this.commentValidator.validate(content);
    
    const sanitizedContent = this.contentSanitizer.sanitize(content);
    
    const comment = {
      _id: new Types.ObjectId(),
      content: sanitizedContent,
      author: new Types.ObjectId(userId),
      createdAt: new Date()
    };
    
    const updatedPost = await PostRepository.addComment(postId, comment);
    
    const user = await UserRepository.findUserPostInfo(userId);
    
    if (!user) {
      throw new ValidationError('Użytkownik nie został znaleziony');
    }

    const likedPosts = Array.isArray(user.likedPosts) ? user.likedPosts : [];
    const savedPosts = Array.isArray(user.savedPosts) ? user.savedPosts : [];
    
    const isLiked = likedPosts.some(id => id && id.toString() === postId);
    const isSaved = savedPosts.some(id => id && id.toString() === postId);
    
    return PostMapper.toPostResponse(updatedPost, isLiked, isSaved);
  }
  
  static async deleteComment(postId: string, commentId: string, userId: string): Promise<PostResponse> {
    const post = await PostRepository.findById(postId);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    const comment = post.comments.find(c => c._id.toString() === commentId);
    
    if (!comment) {
      throw new ValidationError('Komentarz nie został znaleziony');
    }
    
    if (comment.author._id.toString() !== userId && post.author._id.toString() !== userId) {
      throw new ValidationError('Nie masz uprawnień do usunięcia tego komentarza');
    }
    
    const updatedPost = await PostRepository.removeComment(postId, commentId);
    
    const user = await UserRepository.findUserPostInfo(userId);
    
    if (!user) {
      throw new ValidationError('Użytkownik nie został znaleziony');
    }

    const likedPosts = Array.isArray(user.likedPosts) ? user.likedPosts : [];
    const savedPosts = Array.isArray(user.savedPosts) ? user.savedPosts : [];
    
    const isLiked = likedPosts.some(id => id && id.toString() === postId);
    const isSaved = savedPosts.some(id => id && id.toString() === postId);
    
    return PostMapper.toPostResponse(updatedPost, isLiked, isSaved);
  }
} 