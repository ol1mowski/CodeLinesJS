import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { ActiveUsers } from "./ActiveUsers.component";
import { usePosts } from "./hooks/usePosts.hook";

const CommunityFeed = memo(() => {
  const { 
    posts, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage,
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
      />
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 