import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
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
          className="pl-10 pr-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 text-gray-200 placeholder-gray-500 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors w-64"
        />
      </div>
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="bg-gray-800/50 rounded-lg border border-gray-700/50 text-gray-200 px-4 py-2 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
      >
        <option value="all">Wszystkie grupy</option>
        <option value="joined">Moje grupy</option>
        <option value="recommended">Polecane</option>
      </select>
    </div>
  );
});

GroupsFilter.displayName = "GroupsFilter"; 