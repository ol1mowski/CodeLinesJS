import { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaClock } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Group } from "../../../../types/groups.types";
import { useGroups } from "../../../../Hooks/useGroups";
import { useGroupsSearch } from "./context/GroupsSearchContext";


export const GroupsList = memo(() => {
  const { groups, isLoading, joinGroup, leaveGroup, isJoining, isLeaving } = useGroups();
  const { searchQuery, selectedTags } = useGroupsSearch();

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    
    return groups.filter(group => {
      const matchesSearch = searchQuery.toLowerCase().trim() === '' || 
        group.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => group.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [groups, searchQuery, selectedTags]);

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

  if (!filteredGroups.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <HiOutlineUserGroup className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <div>Nie znaleziono grup spełniających kryteria wyszukiwania</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredGroups.map((group) => (
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
          <div className="relative w-24 h-24 group">
            <img
              src={group.image}
              alt={group.name}
              className="w-full h-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-js/20 via-js/10 to-dark/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-js/10 p-4 rounded-full">
                <FaUsers className="w-8 h-8 text-js" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-200 group-hover:text-js transition-colors">
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
                px-4 py-2 rounded-lg transition-all
                ${group.isJoined 
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30" 
                  : "bg-js text-dark hover:bg-js/90"}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading 
                ? (group.isJoined ? "Opuszczanie..." : "Dołączanie...") 
                : (group.isJoined ? "Opuść grupę" : "Dołącz")}
            </motion.button>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-js/10">
                <FaUsers className="w-3 h-3 text-js" />
              </div>
              <span>{group.membersCount} członków</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-js/10">
                <FaComments className="w-3 h-3 text-js" />
              </div>
              <span>{group.postsCount} postów</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-js/10">
                <FaClock className="w-3 h-3 text-js" />
              </div>
              <span>
                Ostatnia aktywność {formatDistanceToNow(group.lastActive, { addSuffix: true, locale: pl })}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {group.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-js/10 text-js border border-js/20 hover:border-js/30 transition-colors"
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