import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { usePosts } from "../../../../Hooks/usePosts";

const CommunityFeed = memo(() => {
  const { 
    posts, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage,
    likePost 
  } = usePosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <CreatePost />
        <PostsList 
          posts={posts}
          isLoading={isLoading}
          isFetchingMore={isFetchingNextPage}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
          onLike={likePost}
        />
      </div>
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 