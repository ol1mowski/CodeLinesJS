import { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { useGroups } from "../../../../Hooks/useGroups";

export const YourGroups = memo(() => {
  const { groups, isLoading } = useGroups();
  const joinedGroups = groups?.filter(group => group.isJoined);

  if (isLoading) {
    return <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 animate-pulse">
      <div className="h-5 w-32 bg-gray-700/50 rounded mb-4" />
      <div className="space-y-3">
        {[1, 2].map(i => (
          <div key={i} className="h-12 bg-gray-700/50 rounded" />
        ))}
      </div>
    </div>;
  }

  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Twoje grupy</h2>
      <div className="space-y-4">
        {joinedGroups?.map(group => (
          <div key={group.id} className="flex items-center justify-between p-3 bg-dark/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-js/20 flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-js" />
              </div>
              <div>
                <h3 className="font-medium text-js">{group.name}</h3>
                <span className="text-sm text-gray-400">{group.membersCount} członków</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

YourGroups.displayName = "YourGroups"; 