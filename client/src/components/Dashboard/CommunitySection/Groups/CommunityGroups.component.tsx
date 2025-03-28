import { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GroupsList } from "./GroupsList.component";
import { YourGroups } from "./YourGroups.component";
import { GroupsFilter } from "./GroupsFilter.component";
import { CreateGroupButton } from "./CreateGroupButton.component";
import { GroupsSearchProvider } from "./context/GroupsSearchContext";

const CommunityGroups = memo(() => {
  const location = useLocation();
  const isGroupView = location.pathname.includes("/groups/") && location.pathname.split("/").length > 4;

  if (isGroupView) {
    return <Outlet />;
  }

  return (
    <GroupsSearchProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
            <GroupsFilter />
            <div className="sm:flex-shrink-0">
              <CreateGroupButton />
            </div>
          </div>
          <GroupsList />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <YourGroups />
          </div>
        </div>
      </div>
    </GroupsSearchProvider>
  );
});

CommunityGroups.displayName = "CommunityGroups";

export default CommunityGroups;