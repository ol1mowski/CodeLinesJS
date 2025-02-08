import { memo } from "react";
import { GroupChat } from "./Chat/GroupChat.component";

export const GroupView = memo(({ groupId }: { groupId: string }) => {
  return (
    <div className="flex-1 px-6">
      <GroupChat groupId={groupId} />
    </div>
  );
});

GroupView.displayName = "GroupView"; 