import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

type GamesSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GamesSearch = memo(({ value, onChange }: GamesSearchProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Szukaj gry..."
          className="
            w-full pl-10 pr-4 py-1.5 
            bg-dark-800/50 border border-js/10
            rounded-lg text-sm text-gray-200
            placeholder-gray-400
            focus:outline-none focus:border-js/30
            transition-colors duration-200
          "
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js/50" />
      </div>

      <motion.div
        initial={false}
        animate={{ 
          width: value ? '100%' : '0%',
          opacity: value ? 1 : 0 
        }}
        className="absolute bottom-0 left-0 h-0.5 bg-js/20 rounded-full"
      />
    </motion.div>
  );
});

GamesSearch.displayName = "GamesSearch"; 