import { motion } from "framer-motion";
import { memo } from "react";
import { FaRoute, FaBook, FaLink } from "react-icons/fa";

type TabType = "paths" | "lessons" | "resources";

type LearnTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const tabs = [
  {
    id: "paths" as const,
    label: "Ścieżki nauki",
    icon: FaRoute,
  },
  {
    id: "lessons" as const,
    label: "Lekcje",
    icon: FaBook,
  },
  {
    id: "resources" as const,
    label: "Zasoby",
    icon: FaLink,
  },
];

export const LearnTabs = memo(({ activeTab, onTabChange }: LearnTabsProps) => {
  return (
    <div className="flex space-x-2 bg-gray-800/50 p-1 rounded-xl backdrop-blur-lg border border-gray-700/50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-colors duration-200
              ${isActive 
                ? "text-indigo-400 bg-indigo-500/10" 
                : "text-gray-400 hover:text-gray-300"}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-gray-400"}`} />
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg -z-10 border border-indigo-500/20"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
});

LearnTabs.displayName = "LearnTabs"; 