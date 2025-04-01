import { PostFinderService, PostManagementService, PostInteractionService } from './services/index.js';
import { PostsResponse, PostResponse } from './types.js';

export class PostService {
  static async getPosts(
    userId: string, 
    options: { 
      page?: number; 
      limit?: number; 
      category?: string; 
      search?: string;
    }
  ): Promise<PostsResponse> {
    return PostFinderService.getPosts(userId, options);
  }
  
  static async getPostById(postId: string, userId: string): Promise<PostResponse> {
    return PostFinderService.getPostById(postId, userId);
  }
  
  static async getComments(postId: string): Promise<any[]> {
    return PostFinderService.getComments(postId);
  }
  
  static async createPost(content: string, userId: string): Promise<PostResponse> {
    return PostManagementService.createPost(content, userId);
  }
  
  static async updatePost(postId: string, content: string, userId: string): Promise<PostResponse> {
    return PostManagementService.updatePost(postId, content, userId);
  }
  
  static async deletePost(postId: string, userId: string): Promise<void> {
    return PostManagementService.deletePost(postId, userId);
  }
  
  static async likePost(postId: string, userId: string): Promise<PostResponse> {
    return PostInteractionService.likePost(postId, userId);
  }
  
  static async savePost(postId: string, userId: string): Promise<PostResponse> {
    return PostInteractionService.savePost(postId, userId);
  }
  
  static async addComment(postId: string, content: string, userId: string): Promise<PostResponse> {
    return PostInteractionService.addComment(postId, content, userId);
  }
  
  static async deleteComment(postId: string, commentId: string, userId: string): Promise<PostResponse> {
    return PostInteractionService.deleteComment(postId, commentId, userId);
  }
} 