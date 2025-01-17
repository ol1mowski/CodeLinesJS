import { memo, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

type FilterValue = "all" | "joined" | "recommended";

export const GroupsFilter = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterValue>("all");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as FilterValue);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Szukaj grup..."
          className="w-full bg-dark/50 pl-10 rounded-lg border border-js/10 p-4 text-gray-300 placeholder-gray-500 focus:border-js focus:ring-1 focus:ring-js"
        />
      </div>
      <select
        className="bg-dark p-3 border border-js/10 text-gray-300 rounded-lg focus:border-js focus:ring-1 focus:ring-js"
        value={filterType}
        onChange={handleFilterChange}
      >
        <option value="all">Wszystkie grupy</option>
        <option value="joined">Moje grupy</option>
        <option value="recommended">Polecane</option>
      </select>
    </div>
  );
});

GroupsFilter.displayName = "GroupsFilter"; 