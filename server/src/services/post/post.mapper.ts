import { PostResponse } from './types.js';
import { Types } from 'mongoose';

export class PostMapper {
  static toPostResponse(post: any, isLiked: boolean, isSaved: boolean): PostResponse {
    return {
      _id: post._id,
      content: post.content,
      author: {
        _id: post.author._id,
        username: post.author.username,
        avatar: post.author.avatar,
        accountType: post.author.accountType
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
    return posts.map(post => {
      const isLiked = userLikedPosts.some(id => id.toString() === post._id.toString());
      const isSaved = userSavedPosts.some(id => id.toString() === post._id.toString());
      
      return this.toPostResponse(post, isLiked, isSaved);
    });
  }
} 