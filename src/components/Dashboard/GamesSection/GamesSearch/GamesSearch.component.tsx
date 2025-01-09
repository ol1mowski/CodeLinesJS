import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

type GamesSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GamesSearch = memo(({ value, onChange }: GamesSearchProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center"
    >
      <FaSearch className="absolute left-3 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Szukaj gry..."
        className="w-full lg:w-64 pl-10 pr-4 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
      />
    </motion.div>
  );
});

GamesSearch.displayName = "GamesSearch"; 