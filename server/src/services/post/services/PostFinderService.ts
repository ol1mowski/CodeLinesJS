import { PostRepository, UserRepository } from '../post.repository.js';
import { PostMapper } from '../post.mapper.js';
import { ValidationError } from '../../../utils/errors.js';
import { PostsResponse, PostResponse } from '../types.js';
import { PostQueryFactory } from '../factories/PostQueryFactory.js';
import { Post } from '../../../models/post.model.js';

export class PostFinderService {
  static async getPosts(
    userId: string, 
    options: { 
      page?: number; 
      limit?: number; 
      category?: string; 
      search?: string;
    }
  ): Promise<PostsResponse> {
    console.log('[PostFinderService.getPosts] Rozpoczęto pobieranie postów dla użytkownika:', userId);
    console.log('[PostFinderService.getPosts] Opcje:', options);
    
    const query = PostQueryFactory.createCompleteQuery(options);
    const paginationOptions = PostQueryFactory.createPaginationOptions(options);
    
    console.log('[PostFinderService.getPosts] Wygenerowane query:', JSON.stringify(query));
    console.log('[PostFinderService.getPosts] Opcje paginacji:', JSON.stringify(paginationOptions));
    
    try {
      // Pobieramy wszystkie posty bez filtrów, żeby sprawdzić czy w ogóle istnieją
      const allPosts = await Post.find({}).limit(10);
      console.log('[PostFinderService.getPosts] Liczba wszystkich postów w bazie (sample):', allPosts.length);
      
      const [postsResult, user] = await Promise.all([
        PostRepository.findAll(query, paginationOptions),
        UserRepository.findUserPostInfo(userId)
      ]);
      
      console.log('[PostFinderService.getPosts] Znalezione posty:', postsResult.docs.length);
      console.log('[PostFinderService.getPosts] Informacje o użytkowniku (likedPosts, savedPosts):', 
        user?.likedPosts?.length || 0, user?.savedPosts?.length || 0);
      
      // Sprawdzamy, czy user.likedPosts i user.savedPosts są zdefiniowane
      const likedPosts = user?.likedPosts || [];
      const savedPosts = user?.savedPosts || [];
      
      const formattedPosts = PostMapper.toPostsResponse(
        postsResult.docs,
        likedPosts,
        savedPosts
      );
      
      console.log('[PostFinderService.getPosts] Sformatowane posty:', formattedPosts.length);
      
      return {
        posts: formattedPosts,
        totalPages: postsResult.totalPages,
        currentPage: postsResult.page,
        totalPosts: postsResult.totalDocs
      };
    } catch (error) {
      console.error('[PostFinderService.getPosts] Błąd podczas pobierania postów:', error);
      throw error;
    }
  }
  
  static async getPostById(postId: string, userId: string): Promise<PostResponse> {
    const [post, user] = await Promise.all([
      PostRepository.findById(postId),
      UserRepository.findUserPostInfo(userId)
    ]);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    const isLiked = user.likedPosts.some(id => id.toString() === postId);
    const isSaved = user.savedPosts.some(id => id.toString() === postId);
    
    return PostMapper.toPostResponse(post, isLiked, isSaved);
  }
  
  static async getComments(postId: string): Promise<any[]> {
    const post = await PostRepository.findById(postId);
    
    if (!post) {
      throw new ValidationError('Post nie został znaleziony');
    }
    
    return post.comments || [];
  }
} 