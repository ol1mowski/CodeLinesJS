import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { ActiveUsers } from "./ActiveUsers.component";
import { usePosts } from "./hooks/usePosts.hook";
import { Post as PostType } from "../../../../types/post.types";

const CommunityFeed = memo(() => {
  const { 
    posts, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage,
  } = usePosts();

  const mappedPosts: PostType[] = posts.map(post => ({
    id: post._id,
    _id: post._id,
    isLiked: post.isLiked,
    author: {
      id: post.author._id,
      username: post.author.username,
      name: post.author.username,
      avatar: undefined
    },
    content: post.content,
    comments: [],
    createdAt: new Date(post.createdAt),
    likes: {
      count: post.likes.count,
      isLiked: post.isLiked
    },
    commentsCount: post.commentsCount
  }));

  return (
    <div className="space-y-6">
      <ActiveUsers />
      <CreatePost />
      <PostsList 
        posts={mappedPosts}
        isLoading={isLoading}
        isFetchingMore={isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 