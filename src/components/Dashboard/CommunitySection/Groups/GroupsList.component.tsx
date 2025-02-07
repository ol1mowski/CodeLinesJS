import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaClock } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Group } from "../../../../types/groups.types";
import { useGroups } from "../../../../Hooks/useGroups";


export const GroupsList = memo(() => {
  const { groups, isLoading, joinGroup, leaveGroup, isJoining, isLeaving } = useGroups();

  const handleJoinGroup = useCallback((groupId: string, isJoined: boolean) => {
    if (isJoined) {
      leaveGroup(groupId);
    } else {
      joinGroup(groupId);
    }
  }, [joinGroup, leaveGroup]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-js/10" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-js/10 rounded mb-2" />
                <div className="h-4 w-48 bg-js/10 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!groups?.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <HiOutlineUserGroup className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <div>Nie znaleziono żadnych grup</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupCard 
          key={group._id} 
          group={group} 
          onJoin={handleJoinGroup}
          isJoining={isJoining}
          isLeaving={isLeaving}
        />
      ))}
    </div>
  );
});


const GroupCard = memo(({ 
  group, 
  onJoin,
  isJoining,
  isLeaving
}: { 
  group: Group;
  onJoin: (groupId: string, isJoined: boolean) => void;
  isJoining: boolean;
  isLeaving: boolean;
}) => {
  const handleJoinClick = useCallback(() => {
    onJoin(group._id, group.isJoined);
  }, [group._id, group.isJoined, onJoin]);

  const isLoading = (group.isJoined ? isLeaving : isJoining);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 backdrop-blur-sm rounded-lg p-4 hover:bg-dark/40 transition-colors border border-js/10"
    >
      <div className="flex gap-6">
        {group.image ? (
          <img
            src={group.image}
            alt={group.name}
            className="w-24 h-24 rounded-lg object-cover relative"
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
              onClick={handleJoinClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className={`
                px-4 py-2 bg-js text-dark rounded-lg hover:bg-js/90 transition-colors
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading 
                ? (group.isJoined ? "Opuszczanie..." : "Dołączanie...") 
                : (group.isJoined ? "Opuść grupę" : "Dołącz")}
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
                className="px-2 py-1 rounded-md text-xs border border-js/10 font-medium bg-dark text-js"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GroupCard.displayName = "GroupCard";
GroupsList.displayName = "GroupsList";