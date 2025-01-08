import { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaClock } from "react-icons/fa";
import { useGroups } from "../../../../hooks/useGroups";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

export const GroupsList = memo(() => {
  const { groups, isLoading } = useGroups();

  if (isLoading) {
    return <GroupsListSkeleton />;
  }

  return (
    <div className="space-y-4">
      {groups?.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex gap-6">
            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <FaUsers className="w-8 h-8 text-indigo-400" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all">
                    {group.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{group.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    ${group.isJoined
                      ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                    }
                    transition-colors
                  `}
                >
                  {group.isJoined ? "Opuść grupę" : "Dołącz"}
                </motion.button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaUsers className="text-xs" />
                  <span>{group.membersCount} członków</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComments className="text-xs" />
                  <span>{group.postsCount} postów</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-xs" />
                  <span>
                    Ostatnia aktywność {formatDistanceToNow(group.lastActive, { addSuffix: true, locale: pl })}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-gray-700/50 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

GroupsList.displayName = "GroupsList";

const GroupsListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 animate-pulse">
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-lg bg-gray-700/50" />
          <div className="flex-1 space-y-4">
            <div className="h-6 w-48 bg-gray-700/50 rounded" />
            <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-24 bg-gray-700/50 rounded" />
              <div className="h-4 w-24 bg-gray-700/50 rounded" />
              <div className="h-4 w-32 bg-gray-700/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
); 