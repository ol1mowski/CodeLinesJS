import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

export const getPostsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const userId = req.user.userId;
    
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }
    
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: [
        { path: "author", select: "username avatar" },
        { path: "comments.author", select: "username avatar" }
      ]
    };
    
    const posts = await Post.paginate(query, options);
    
    const user = await User.findById(userId).select("savedPosts likedPosts");
    
    const formattedPosts = posts.docs.map(post => {
      const isSaved = user.savedPosts.includes(post._id);
      const isLiked = user.likedPosts.includes(post._id);
      
      return {
        ...post.toObject(),
        isSaved,
        isLiked,
        commentsCount: post.comments.length
      };
    });
    
    res.json({
      posts: formattedPosts,
      totalPages: posts.totalPages,
      currentPage: posts.page,
      totalPosts: posts.totalDocs
    });
  } catch (error) {
    next(error);
  }
}; 