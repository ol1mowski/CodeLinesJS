import { motion } from "framer-motion";
import { memo } from "react";
import { FaGraduationCap, FaBook, FaLightbulb } from "react-icons/fa";

type TabType = "paths" | "lessons" | "resources";

type LearnTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const tabs = [
  { id: "paths" as const, label: "Ścieżki nauki", icon: FaGraduationCap },
  { id: "lessons" as const, label: "Lekcje", icon: FaBook },
  { id: "resources" as const, label: "Materiały", icon: FaLightbulb },
];

export const LearnTabs = memo(({ activeTab, onTabChange }: LearnTabsProps) => {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange(tab.id)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
            ${activeTab === tab.id 
              ? "text-js bg-js/10 border border-js/20" 
              : "text-gray-400 hover:text-js/80 border border-transparent"
            }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-js/5 rounded-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
});

LearnTabs.displayName = "LearnTabs"; 