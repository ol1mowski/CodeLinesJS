import { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaClock } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner.component";
import { useGroups } from "./hooks/useGroups";
import { useGroupsSearch } from "./context/GroupsSearchContext";
import type { Group } from "../../../../types/groups.types";

export const GroupsList = memo(() => {
  const { groups, isLoading, joinGroup, isJoining } = useGroups();
  const { searchQuery, selectedTags } = useGroupsSearch();
  
  const handleJoinGroup = useCallback((groupId: string) => {
    joinGroup(groupId);
  }, [joinGroup]);

  const { filteredGroups, isEmpty } = useMemo(() => {
    if (!groups) {
      return { filteredGroups: [], isEmpty: true };
    }
    
    const groupsArray = Array.isArray(groups) ? groups : [];
    
    const filtered = groupsArray.filter(group => {
      const matchesSearch = searchQuery.toLowerCase().trim() === '' || 
        group.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => group.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
    
    return { 
      filteredGroups: filtered, 
      isEmpty: filtered.length === 0 
    };
  }, [groups, searchQuery, selectedTags]);

  if (isLoading) {
    return <LoadingSpinner text="Ładowanie grup..." />;
  }

  if (!groups) {
    return (
      <div className="text-center p-8 bg-dark/30 rounded-lg">
        <div className="text-red-500 text-2xl mb-2">Błąd ładowania</div>
        <p className="text-gray-400">
          Nie udało się załadować grup. Spróbuj ponownie później.
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center text-gray-400 py-8">
        <HiOutlineUserGroup className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <div>Nie znaleziono grup spełniających kryteria wyszukiwania</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredGroups.map(group => (
        <GroupCard 
          key={group.id} 
          group={group as Group} 
          onJoin={handleJoinGroup}
          isJoining={isJoining}
        />
      ))}
    </div>
  );
});

interface GroupCardProps {
  group: Group;
  onJoin: (groupId: string) => void;
  isJoining: boolean;
}

const GroupCard = memo(({ group, onJoin, isJoining }: GroupCardProps) => {
  const handleJoinClick = useCallback(() => {
    onJoin(group.id);
  }, [group.id, onJoin]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-dark/30 backdrop-blur-sm rounded-lg p-4 hover:bg-dark/40 transition-all duration-300 border border-js/10 
                hover:border-js/20 hover:shadow-lg hover:shadow-js/5"
    >
      <div className="flex gap-6">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-js/20 via-js/10 to-dark/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-js/10 p-4 rounded-full">
              <FaUsers className="w-8 h-8 text-js" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              disabled={isJoining}
              className={`
                px-4 py-2 rounded-lg transition-all duration-300
                ${group.isJoined 
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50" 
                  : "bg-js text-dark hover:bg-js/90 hover:shadow-md hover:shadow-js/20"}
                ${isJoining ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <motion.span
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isJoining 
                  ? (group.isJoined ? "Opuszczanie..." : "Dołączanie...") 
                  : (group.isJoined ? "Opuść grupę" : "Dołącz")}
              </motion.span>
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
                <FaClock className="w-3 h-3 text-js" />
              </div>
              <span>
                Utworzona {formatDistanceToNow(new Date(group.lastActive), { addSuffix: true, locale: pl })}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {group.tags && group.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-js/10 text-js border border-js/20 
                         hover:border-js/30 transition-all duration-300 hover:bg-js/15"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GroupCard.displayName = "GroupCard";
GroupsList.displayName = "GroupsList";