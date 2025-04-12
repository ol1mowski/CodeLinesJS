import { useGroups as useGlobalGroups } from '../../../../../hooks/useGroups';
import { useGroupsSearch } from '../context/GroupsSearchContext';
import { useCallback, useMemo, useState } from 'react';

export const useGroups = () => {
  const { groups: groupsData, isLoading, joinGroup, leaveGroup, isJoining, isLeaving, error } = useGlobalGroups();
  const { searchQuery, selectedTags } = useGroupsSearch();
  const [groupToLeave, setGroupToLeave] = useState<string | null>(null);
  
  const handleJoinGroup = useCallback((groupId: string) => {
    joinGroup(groupId);
  }, [joinGroup]);

  const handleLeaveGroup = useCallback((groupId: string) => {
    leaveGroup(groupId);
  }, [leaveGroup]);

  const { filteredGroups, isEmpty } = useMemo(() => {
    if (!groupsData?.groups) {
      return { filteredGroups: [], isEmpty: true };
    }
    
    const groupsArray = groupsData.groups || [];
    
    const filtered = groupsArray.filter(group => {
      const matchesSearch = searchQuery.toLowerCase().trim() === '' || 
        group.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (group.description && group.description.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => group.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
    
    return { 
      filteredGroups: filtered, 
      isEmpty: filtered.length === 0 
    };
  }, [groupsData, searchQuery, selectedTags]);

  return {
    groups: filteredGroups,
    isLoading,
    joinGroup: handleJoinGroup,
    leaveGroup: handleLeaveGroup,
    isJoining,
    isLeaving,
    isEmpty,
    groupToLeave,
    setGroupToLeave,
    error
  };
}; 