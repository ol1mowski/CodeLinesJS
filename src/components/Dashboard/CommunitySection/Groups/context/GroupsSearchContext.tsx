import { createContext, useContext, useState, ReactNode } from 'react';

type GroupsSearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

const GroupsSearchContext = createContext<GroupsSearchContextType | undefined>(undefined);

export const GroupsSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <GroupsSearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      selectedTags, 
      setSelectedTags 
    }}>
      {children}
    </GroupsSearchContext.Provider>
  );
};

export const useGroupsSearch = () => {
  const context = useContext(GroupsSearchContext);
  if (!context) {
    throw new Error('useGroupsSearch must be used within GroupsSearchProvider');
  }
  return context;
}; 