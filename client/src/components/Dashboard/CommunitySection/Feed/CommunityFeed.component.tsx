import { memo } from "react";
import { ActiveUsers } from "./ActiveUsers.component";

const CommunityFeed = memo(() => {

  return (
    <div className="space-y-6">
      <ActiveUsers />
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 