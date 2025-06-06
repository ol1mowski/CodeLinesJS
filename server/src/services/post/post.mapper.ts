import { Types } from 'mongoose';

import { PostResponse } from './types.js';

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
          accountType: 'user',
        },
        comments: [],
        commentsCount: 0,
        likes: {
          count: 0,
          isLiked: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isLiked: false,
        isSaved: false,
        title: '',
        category: '',
      };
    }

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

    const result = {
      _id: post._id,
      content: post.content,
      author: {
        _id: post.author?._id,
        username: post.author?.username || 'Nieznany',
        avatar: post.author?.avatar || '',
        accountType: post.author?.accountType || 'user',
      },
      comments: post.comments || [],
      commentsCount: post.comments?.length || 0,
      likes: {
        count: likesCount,
        isLiked: isLiked,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isLiked,
      isSaved,
      title: post.title,
      category: post.category,
    };

    return result;
  }

  static toPostsResponse(
    posts: any[],
    userLikedPosts: Types.ObjectId[],
    userSavedPosts: Types.ObjectId[],
  ): PostResponse[] {
    if (!Array.isArray(posts)) {
      console.error('PostMapper.toPostsResponse: posts nie jest tablicą');
      return [];
    }

    // Filtrowanie nullowych postów
    const validPosts = posts.filter((post) => post !== null && post !== undefined && post._id);

    if (validPosts.length !== posts.length) {
      console.warn(
        `PostMapper.toPostsResponse: Usunięto ${posts.length - validPosts.length} nullowych postów z tablicy`,
      );
    }

    return validPosts
      .map((post) => {
        try {
          const postId = post._id.toString();

          let isLiked = false;

          if (Array.isArray(userLikedPosts) && userLikedPosts.length > 0) {
            isLiked = userLikedPosts.some((id) => id && id.toString() === postId);
          }

          if (post.likes && Array.isArray(post.likes.userIds) && post.likes.userIds.length > 0) {
            const userId =
              userLikedPosts && userLikedPosts.length > 0
                ? userLikedPosts[0].valueOf().toString().split('_')[0]
                : undefined;

            if (userId) {
              const userIdInLikes = post.likes.userIds.some(
                (id: any) => id && id.toString().includes(userId),
              );

              if (userIdInLikes) {
                isLiked = true;
              }
            }
          }

          const isSaved =
            Array.isArray(userSavedPosts) &&
            userSavedPosts.some((id) => id && id.toString() === postId);

          return this.toPostResponse(post, isLiked, isSaved);
        } catch (error) {
          console.error(
            'PostMapper.toPostsResponse: Błąd podczas mapowania posta:',
            error,
            'Post:',
            post,
          );
          return null;
        }
      })
      .filter(Boolean);
  }
}
