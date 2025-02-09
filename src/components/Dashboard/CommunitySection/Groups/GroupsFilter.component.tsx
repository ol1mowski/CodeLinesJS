import { memo, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Select from 'react-select';
import { useGroupsSearch } from "./context/GroupsSearchContext";
import { AVAILABLE_TAGS } from "./CreateGroupForm.component";

export const GroupsFilter = memo(() => {
  const { searchQuery, setSearchQuery, selectedTags, setSelectedTags } = useGroupsSearch();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  const handleTagsChange = useCallback((newValue: any) => {
    setSelectedTags(newValue ? newValue.map((item: any) => item.value) : []);
  }, [setSelectedTags]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, [setSearchQuery, setSelectedTags]);

  const hasFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Szukaj grup..."
            className="w-full bg-dark/50 pl-10 rounded-lg border border-js/10 p-3 text-gray-300 
                     placeholder-gray-500 focus:border-js focus:ring-1 focus:ring-js"
          />
        </div>
        {hasFilters && (
          <button
            onClick={handleClearFilters}
            className="px-3 py-2 text-gray-400 hover:text-js transition-colors"
            title="Wyczyść filtry"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <Select
        isMulti
        value={selectedTags.map(tag => AVAILABLE_TAGS.find(t => t.value === tag))}
        onChange={handleTagsChange}
        options={AVAILABLE_TAGS}
        placeholder="Filtruj po tagach..."
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'rgba(17, 17, 17, 0.5)',
            borderColor: 'rgba(247, 223, 30, 0.1)',
            '&:hover': {
              borderColor: 'rgba(247, 223, 30, 0.3)'
            }
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'rgba(17, 17, 17, 0.95)',
            backdropFilter: 'blur(10px)'
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused 
              ? 'rgba(247, 223, 30, 0.1)' 
              : 'transparent',
            color: state.isSelected ? '#f7df1e' : '#d1d5db',
            '&:hover': {
              backgroundColor: 'rgba(247, 223, 30, 0.1)'
            }
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(247, 223, 30, 0.1)',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#f7df1e',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#f7df1e',
            '&:hover': {
              backgroundColor: 'rgba(247, 223, 30, 0.2)',
              color: '#f7df1e',
            }
          }),
        }}
      />
    </div>
  );
});

GroupsFilter.displayName = "GroupsFilter"; 