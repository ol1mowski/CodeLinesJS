import { motion } from "framer-motion";
import { memo } from "react";
import { FaUser, FaLock, FaCog, FaTrash } from "react-icons/fa";

type SettingsView = "profile" | "security" | "preferences" | "delete";

type SettingsSidebarProps = {
  activeView: SettingsView;
  onViewChange: (view: SettingsView) => void;
};

const menuItems = [
  { id: "profile" as const, label: "Profil", icon: FaUser },
  { id: "security" as const, label: "Bezpieczeństwo", icon: FaLock },
  { id: "preferences" as const, label: "Preferencje", icon: FaCog },
  { id: "delete" as const, label: "Usuń konto", icon: FaTrash },
];

export const SettingsSidebar = memo(({ activeView, onViewChange }: SettingsSidebarProps) => (
  <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 h-fit shadow-lg">
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange(item.id)}
          className={`
            flex items-center gap-3 p-3 rounded-lg text-left
            transition-colors duration-200
            ${activeView === item.id
              ? "bg-js/20 text-js"
              : "text-gray-400 hover:text-js hover:bg-js/10"
            }
          `}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </motion.button>
      ))}
    </nav>
  </div>
));

SettingsSidebar.displayName = "SettingsSidebar"; 