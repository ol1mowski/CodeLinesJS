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
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isLiked: false,
        isSaved: false,
        title: '',
        category: ''
      };
    }

    return {
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
      likes: post.likes || 0,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isLiked,
      isSaved,
      title: post.title,
      category: post.category
    };
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
        const isLiked = Array.isArray(userLikedPosts) && userLikedPosts.some(id => id && id.toString() === postId);
        const isSaved = Array.isArray(userSavedPosts) && userSavedPosts.some(id => id && id.toString() === postId);
        
        return this.toPostResponse(post, isLiked, isSaved);
      } catch (error) {
        console.error('PostMapper.toPostsResponse: Błąd podczas mapowania posta:', error, 'Post:', post);
        return null;
      }
    }).filter(Boolean);
  }
} 