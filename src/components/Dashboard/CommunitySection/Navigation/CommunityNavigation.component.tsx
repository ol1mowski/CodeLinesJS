import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaTrophy, FaUsers } from "react-icons/fa";

type CommunityView = "feed" | "ranking" | "groups";

type CommunityNavigationProps = {
  activeView: CommunityView;
  onViewChange: (view: CommunityView) => void;
};

const navigationItems = [
  {
    id: "feed" as const,
    label: "Aktualności",
    icon: FaNewspaper,
  },
  {
    id: "ranking" as const,
    label: "Ranking",
    icon: FaTrophy,
  },
  {
    id: "groups" as const,
    label: "Grupy",
    icon: FaUsers,
  },
] as const;

export const CommunityNavigation = memo(({ activeView, onViewChange }: CommunityNavigationProps) => {
  return (
    <div className="flex space-x-2 bg-gray-800/50 p-1 rounded-xl backdrop-blur-lg border border-gray-700/50">
      {navigationItems.map((item) => (
        <NavigationButton
          key={item.id}
          item={item}
          isActive={activeView === item.id}
          onClick={() => onViewChange(item.id)}
        />
      ))}
    </div>
  );
});

type NavigationButtonProps = {
  item: typeof navigationItems[number];
  isActive: boolean;
  onClick: () => void;
};

const NavigationButton = memo(({ item, isActive, onClick }: NavigationButtonProps) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const Icon = item.icon;

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${isActive 
          ? "text-indigo-400" 
          : "text-gray-400 hover:text-gray-300"}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-gray-400"}`} />
      {item.label}
      {isActive && (
        <motion.div
          layoutId="activeView"
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg -z-10 border border-indigo-500/20"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </motion.button>
  );
});

CommunityNavigation.displayName = "CommunityNavigation";
NavigationButton.displayName = "NavigationButton"; 