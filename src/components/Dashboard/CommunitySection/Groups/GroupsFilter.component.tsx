import { memo, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";


export const GroupsFilter = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    </div>
  );
});

GroupsFilter.displayName = "GroupsFilter"; 