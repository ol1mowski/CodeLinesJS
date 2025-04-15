import { PostResponse } from './types.js';
import { Types } from 'mongoose';

export class PostMapper {
  static toPostResponse(post: any, isLiked: boolean, isSaved: boolean): PostResponse {
    if (!post) {
      console.error('PostMapper.toPostResponse: Otrzymano null post');
      return {
        _id: null,
        content: '',
        author: {
          _id: null,
          username: 'Usunięty użytkownik',
          avatar: '',
          accountType: 'user'
        },
        comments: [],
        commentsCount: 0,
        likes: {
          count: 0,
          isLiked: false
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isLiked: false,
        isSaved: false,
        title: '',
        category: ''
      };
    }

    // Obliczanie liczby polubień
    let likesCount = 0;
    if (post.likes !== undefined) {
      if (typeof post.likes === 'number') {
        likesCount = post.likes;
      } else if (typeof post.likes === 'object' && post.likes !== null) {
        if (post.likes.count !== undefined) {
          likesCount = parseInt(post.likes.count) || 0;
        }
      }
    }

    // Struktura zgodna z frontendem
    const result = {
      _id: post._id,
      content: post.content,
      author: {
        _id: post.author?._id,
        username: post.author?.username || 'Nieznany',
        avatar: post.author?.avatar || '',
        accountType: post.author?.accountType || 'user'
      },
      comments: post.comments || [],
      commentsCount: post.comments?.length || 0,
      likes: {
        count: likesCount,
        isLiked: isLiked
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isLiked,
      isSaved,
      title: post.title,
      category: post.category
    };

    return result;
  }

  static toPostsResponse(
    posts: any[],
    userLikedPosts: Types.ObjectId[],
    userSavedPosts: Types.ObjectId[]
  ): PostResponse[] {
    
    if (!Array.isArray(posts)) {
      return [];
    }
    
    const validPosts = posts.filter(post => post && post._id);
    
    return validPosts.map(post => {
      try {
        const postId = post._id.toString();
        
        // Sprawdź, czy użytkownik polubił post na podstawie userLikedPosts lub post.likes.userIds
        let isLiked = false;
        
        // Sprawdź na podstawie userLikedPosts
        if (Array.isArray(userLikedPosts)) {
          isLiked = userLikedPosts.some(id => id && id.toString() === postId);
        }
        
        // Jeśli nie polubiony, sprawdź też post.likes.userIds jeśli istnieje
        if (!isLiked && post.likes && Array.isArray(post.likes.userIds) && userLikedPosts && userLikedPosts.length > 0) {
          // Pobierz pierwszy element z userLikedPosts, aby uzyskać ID użytkownika
          const userId = userLikedPosts[0].valueOf();
          isLiked = post.likes.userIds.some((id: any) => id && id.toString() === userId.toString());
        }
        
        const isSaved = Array.isArray(userSavedPosts) && userSavedPosts.some(id => id && id.toString() === postId);
        
        return this.toPostResponse(post, isLiked, isSaved);
      } catch (error) {
        console.error('PostMapper.toPostsResponse: Błąd podczas mapowania posta:', error, 'Post:', post);
        return null;
      }
    }).filter(Boolean);
  }
} 