import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { SettingsView } from "../types/settings";
import { menuItems } from "../data/SettingsSidebar.data";
import { styles } from "./style/SettingsSidebar.styles";

type SettingsSidebarProps = {
  activeView: SettingsView;
  onViewChange: (view: SettingsView) => void;
};

export const SettingsSidebar = memo(({ activeView, onViewChange }: SettingsSidebarProps) => {
  const handleViewChange = useCallback((view: SettingsView) => {
    onViewChange(view);
  }, [onViewChange]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleViewChange(item.id)}
            className={styles.button(activeView === item.id)}
          >
            <item.icon className={styles.icon} />
            {item.label}
          </motion.button>
        ))}
      </nav>
    </div>
  );
});

SettingsSidebar.displayName = "SettingsSidebar"; 