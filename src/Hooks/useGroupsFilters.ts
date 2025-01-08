import { useCallback, useState } from 'react';
import { Group } from '../types/groups.types';

type FilterType = "all" | "joined" | "recommended";

export const useGroupsFilters = (groups: Group[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  const filteredGroups = useCallback(() => {
    if (!groups) return [];

    let filtered = [...groups];

    // Filtrowanie po typie
    if (filterType === "joined") {
      filtered = filtered.filter(group => group.isJoined);
    } else if (filterType === "recommended") {
      filtered = filtered.filter(group => !group.isJoined);
    }

    // Filtrowanie po wyszukiwaniu
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(query) ||
        group.description.toLowerCase().includes(query) ||
        group.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [groups, filterType, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filteredGroups: filteredGroups()
  };
}; 