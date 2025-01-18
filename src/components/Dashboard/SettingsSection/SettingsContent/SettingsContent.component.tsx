import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { ProfileForm } from "./ProfileForm/ProfileForm.component";
import { SecurityForm } from "./SecurityForm/SecurityForm.component";
import { PreferencesForm } from "./PreferencesForm/PreferencesForm.component";
import { DeleteAccountForm } from "./DeleteAccountForm/DeleteAccountForm.component";

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
      className="bg-dark/30 backdrop-blur-sm rounded-xl p-6 border border-js/10 shadow-lg"
    >
      <h2 className="text-2xl font-bold font-space text-js mb-6">
        {activeView === "profile" && "Edytuj Profil"}
        {activeView === "security" && "Bezpieczeństwo"}
        {activeView === "preferences" && "Preferencje"}
        {activeView === "delete" && "Usuń Konto"}
      </h2>
      
      {activeView === "profile" && <ProfileForm />}
      {activeView === "security" && <SecurityForm />}
      {activeView === "preferences" && <PreferencesForm />}
      {activeView === "delete" && <DeleteAccountForm />}
    </motion.div>
  </AnimatePresence>
));

SettingsContent.displayName = "SettingsContent"; 