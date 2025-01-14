import { memo } from "react";
import { GroupsList } from "./GroupsList.component";

import { YourGroups } from "./YourGroups.component";
import { PopularTags } from "./PopularTags.component";
import { GroupsFilter } from "./GroupsFilter.component";
import { CreateGroupButton } from "./CreateGroupButton.component";

const CommunityGroups = memo(() => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <GroupsFilter />
          <CreateGroupButton />
        </div>
        <GroupsList />
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-28 space-y-6">
          <YourGroups />
          <PopularTags />
        </div>
      </div>
    </div>
  );
});

export default CommunityGroups;

CommunityGroups.displayName = "CommunityGroups"; 