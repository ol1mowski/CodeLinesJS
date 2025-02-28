import { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaCog } from "react-icons/fa";

type Tab = 'chat' | 'members' | 'settings';

type GroupTabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isAdmin: boolean;
};

export const GroupTabs = memo(({ activeTab, onTabChange, isAdmin }: GroupTabsProps) => {
  const tabs = [
    { id: 'chat' as const, label: 'Czat', icon: FaComments },
    { id: 'members' as const, label: 'Członkowie', icon: FaUsers },
    ...(isAdmin ? [{ id: 'settings' as const, label: 'Ustawienia', icon: FaCog }] : [])
  ];

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === tab.id 
              ? 'bg-js text-dark font-medium' 
              : 'text-gray-400 hover:text-js bg-dark/20'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}); 