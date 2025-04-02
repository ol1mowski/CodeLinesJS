import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PostService } from '../../../src/services/post/post.service.js';
import { PostFinderService, PostManagementService, PostInteractionService } from '../../../src/services/post/services/index.js';
import { Types } from 'mongoose';

vi.mock('../../../src/services/post/services/PostManagementService.js');
vi.mock('../../../src/services/post/services/PostFinderService.js');
vi.mock('../../../src/services/post/services/PostInteractionService.js');

describe('PostService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('createPost', () => {
    it('should call PostManagementService.createPost with correct parameters', async () => {
      const content = 'Test post content';
      const userId = 'user123';
      
      const mockPost = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        content: 'Test post content',
        author: {
          _id: new Types.ObjectId('507f1f77bcf86cd799439012'),
          username: 'testuser'
        }
      };
      
      PostManagementService.createPost = vi.fn().mockResolvedValue(mockPost);
      
      const result = await PostService.createPost(content, userId);
      
      expect(PostManagementService.createPost).toHaveBeenCalledWith(content, userId);
      expect(result).toEqual(mockPost);
    });
    
    it('should propagate errors from PostManagementService', async () => {
      const content = 'Test post content';
      const userId = 'user123';
      
      const mockError = new Error('Validation error');
      PostManagementService.createPost = vi.fn().mockRejectedValue(mockError);
      
      await expect(PostService.createPost(content, userId))
        .rejects.toThrow(mockError);
        
      expect(PostManagementService.createPost).toHaveBeenCalledWith(content, userId);
    });
  });
  
  describe('addComment', () => {
    it('should call PostInteractionService.addComment with correct parameters', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const content = 'Test comment content';
      const userId = 'user123';
      const validObjectId = '507f1f77bcf86cd799439013';
      
      const mockPost = {
        _id: new Types.ObjectId(postId),
        content: 'Original post content',
        comments: [
          {
            _id: new Types.ObjectId(),
            content: 'Test comment content',
            author: new Types.ObjectId(validObjectId),
            createdAt: new Date()
          }
        ]
      };
      
      PostInteractionService.addComment = vi.fn().mockResolvedValue(mockPost);
      
      const result = await PostService.addComment(postId, content, userId);
      
      expect(PostInteractionService.addComment).toHaveBeenCalledWith(postId, content, userId);
      expect(result).toEqual(mockPost);
    });
    
    it('should propagate errors from PostInteractionService', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const content = 'Test comment content';
      const userId = 'user123';
      
      const mockError = new Error('Post not found');
      PostInteractionService.addComment = vi.fn().mockRejectedValue(mockError);
      
      await expect(PostService.addComment(postId, content, userId))
        .rejects.toThrow(mockError);
        
      expect(PostInteractionService.addComment).toHaveBeenCalledWith(postId, content, userId);
    });
  });
  
  describe('getPosts', () => {
    it('should call PostFinderService.getPosts with correct parameters', async () => {
      const userId = 'user123';
      const options = {
        page: 1,
        limit: 10,
        category: 'tech',
        search: 'javascript'
      };
      
      const mockResponse = {
        posts: [
          {
            _id: new Types.ObjectId(),
            content: 'Post about JavaScript',
            author: {
              _id: new Types.ObjectId(),
              username: 'testuser'
            },
            comments: [],
            commentsCount: 0,
            likes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            isLiked: false,
            isSaved: false
          }
        ],
        totalPages: 1,
        currentPage: 1,
        totalPosts: 1
      };
      
      PostFinderService.getPosts = vi.fn().mockResolvedValue(mockResponse);
      
      const result = await PostService.getPosts(userId, options);
      
      expect(PostFinderService.getPosts).toHaveBeenCalledWith(userId, options);
      expect(result).toEqual(mockResponse);
    });
  });
}); 