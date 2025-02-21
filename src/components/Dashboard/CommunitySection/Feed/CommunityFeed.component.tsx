import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { usePosts } from "../../../../Hooks/usePosts";
import { ActiveUsers } from "./ActiveUsers.component";

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
    <div className="space-y-6">
      <ActiveUsers />
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
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 