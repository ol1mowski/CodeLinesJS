import { useMemo } from "react";

export const useNavigationItemStyles = (isActive: boolean) => {
  return useMemo(() => `
    block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
    ${isActive 
      ? "bg-js/10 text-js border border-js/20" 
      : "text-gray-400 hover:text-js/80"}
  `, [isActive]);
}; 