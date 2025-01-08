import { motion } from "framer-motion";
import { memo, useState } from "react";
import { SettingsSidebar } from "./SettingsSidebar/SettingsSidebar.component";
import { SettingsContent } from "./SettingsContent/SettingsContent.component";

type SettingsView = "profile" | "security" | "preferences" | "delete";

export const SettingsSection = memo(() => {
  const [activeView, setActiveView] = useState<SettingsView>("profile");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SettingsSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="lg:col-span-3">
          <SettingsContent activeView={activeView} />
        </div>
      </div>
    </motion.div>
  );
});

SettingsSection.displayName = "SettingsSection"; 