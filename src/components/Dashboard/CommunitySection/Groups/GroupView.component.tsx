import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGroup } from "../hooks/useGroup";
import { GroupChat } from "./Chat/GroupChat.component";

export const GroupView = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: group, isLoading, error } = useGroup(groupId);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania grupy</div>;
  }

  if (!group) {
    return <div>Nie znaleziono grupy</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-js">{group.name}</h2>
      </div>
      <div className="flex-1 px-6">
        <GroupChat groupId={groupId} />
      </div>
    </div>
  );
});

GroupView.displayName = "GroupView"; 