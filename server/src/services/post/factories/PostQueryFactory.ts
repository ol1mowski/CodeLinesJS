import { PostQuery, PaginationOptions } from '../types.js';

export class PostQueryFactory {
  static createBasicQuery(): PostQuery {
    return { isPublished: true };
  }
  
  static createSearchQuery(search?: string): Partial<PostQuery> {
    if (!search) return {};
    
    return {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    };
  }
  
  static createCategoryQuery(category?: string): Partial<PostQuery> {
    if (!category) return {};
    
    return { category };
  }
  
  static createCompleteQuery(options: { 
    category?: string;
    search?: string;
  }): PostQuery {
    const { category, search } = options;
    const query = this.createBasicQuery();
    
    if (category) {
      Object.assign(query, this.createCategoryQuery(category));
    }
    
    if (search) {
      Object.assign(query, this.createSearchQuery(search));
    }
    
    return query;
  }
  
  static createPaginationOptions(options: {
    page?: number;
    limit?: number;
  }): PaginationOptions {
    const { page = 1, limit = 10 } = options;
    
    return {
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
      sort: { createdAt: -1 },
      populate: [
        { path: 'author', select: 'username avatar accountType' },
        { path: 'comments.author', select: 'username avatar' }
      ]
    };
  }
} 