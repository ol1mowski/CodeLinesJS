import { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { useGroups } from "../../../../hooks/useGroups";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <h3 className="text-lg font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
        Twoje grupy
      </h3>
      <div className="space-y-3">
        {joinedGroups?.map(group => (
          <div
            key={group.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
          >
            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <FaUsers className="w-4 h-4 text-indigo-400" />
              </div>
            )}
            <span className="text-gray-300">{group.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

YourGroups.displayName = "YourGroups"; 