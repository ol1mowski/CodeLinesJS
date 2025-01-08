import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { TrendingTopics } from "./TrendingTopics.component";
import { OnlineUsers } from "./OnlineUsers.component";

export const CommunityFeed = memo(() => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <CreatePost />
        <PostsList />
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-28 space-y-6">
          <TrendingTopics />
          <OnlineUsers />
        </div>
      </div>
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed"; 