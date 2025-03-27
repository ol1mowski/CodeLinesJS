import { memo } from "react";
import { FaUsers } from "react-icons/fa";
import { useGroups } from "../../../../Hooks/useGroups";
import { Link } from "react-router-dom";

type Group = {
  _id: string;
  name: string;
  membersCount: number;
}

type GroupsResponse = {
  groups: Group[];
  userGroups: Group[];
}

export const YourGroups = memo(() => {
  const { groups, isLoading } = useGroups();

  const groupsData = groups as unknown as GroupsResponse;
  const userGroups = groupsData?.userGroups || [];

  if (isLoading) {
    return (
      <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4">
        <h2 className="text-lg font-bold text-js mb-4">Twoje grupy</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-js/10" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-js/10 rounded mb-2" />
                <div className="h-3 w-16 bg-js/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!userGroups.length) {
    return (
      <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6">
        <div className="text-center">
          <div className="bg-js/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="w-8 h-8 text-js" />
          </div>
          <h2 className="text-lg font-bold text-js mb-2">Brak grup</h2>
          <p className="text-gray-400 text-sm mb-4">
            Nie należysz jeszcze do żadnej grupy. Dołącz do istniejącej lub stwórz własną!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4">
      <h2 className="text-lg font-bold text-js mb-4">Twoje grupy</h2>
      <div className="space-y-3">
        {userGroups.map((group: Group) => (
          <Link
            key={group._id}
            to={`/dashboard/community/groups/${group._id}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-js/10 flex items-center justify-center">
              <FaUsers className="w-5 h-5 text-js" />
            </div>
            <div>
              <h3 className="font-medium text-gray-200 group-hover:text-js transition-colors">
                {group.name}
              </h3>
              <span className="text-xs text-gray-400">
                {group.membersCount} członków
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

YourGroups.displayName = "YourGroups"; 