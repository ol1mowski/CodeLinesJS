import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { ProfileForm } from "./ProfileForm/ProfileForm.component";
import { SecurityForm } from "./SecurityForm/SecurityForm.component";
import { PreferencesForm } from "./PreferencesForm/PreferencesForm.component";

type SettingsView = "profile" | "security" | "preferences" | "delete";

type SettingsContentProps = {
  activeView: SettingsView;
};

export const SettingsContent = memo(({ activeView }: SettingsContentProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeView}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <h2 className="text-2xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">
        {activeView === "profile" && "Edytuj Profil"}
        {activeView === "security" && "Bezpieczeństwo"}
        {activeView === "preferences" && "Preferencje"}
        {activeView === "delete" && "Usuń Konto"}
      </h2>
      
      {activeView === "profile" && <ProfileForm />}
      {activeView === "security" && <SecurityForm />}
      {activeView === "preferences" && <PreferencesForm />}
    </motion.div>
  </AnimatePresence>
));

SettingsContent.displayName = "SettingsContent"; 