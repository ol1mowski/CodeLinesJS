import { motion } from "framer-motion";
import { FaSignInAlt, FaUserPlus, FaKey } from "react-icons/fa";
import { memo } from "react";

type AuthMode = "login" | "register" | "forgot";

type AuthTabsProps = {
  activeTab: AuthMode;
  onTabChange: (mode: AuthMode) => void;
};

export const AuthTabs = memo(({ activeTab, onTabChange }: AuthTabsProps) => (
  <div 
    className="flex items-center justify-center gap-4 mb-8"
    role="tablist"
    aria-label="Wybór formularza autoryzacji"
  >
    <TabButton
      isActive={activeTab === "login"}
      onClick={() => onTabChange("login")}
      icon={<FaSignInAlt />}
      label="Logowanie"
      id="login-tab"
    />
    <TabButton
      isActive={activeTab === "register"}
      onClick={() => onTabChange("register")}
      icon={<FaUserPlus />}
      label="Rejestracja"
      id="register-tab"
    />
    <TabButton
      isActive={activeTab === "forgot"}
      onClick={() => onTabChange("forgot")}
      icon={<FaKey />}
      label="Reset hasła"
      id="forgot-tab"
    />
  </div>
));

AuthTabs.displayName = "AuthTabs";

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  id: string;
};

const TabButton = memo(({ isActive, onClick, icon, label, id }: TabButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400"
        : "text-gray-400 hover:text-indigo-400"
    }`}
    role="tab"
    aria-selected={isActive}
    aria-controls={`${id}-panel`}
    id={id}
    tabIndex={isActive ? 0 : -1}
  >
    <span className="sr-only">{isActive ? "Aktywna zakładka:" : ""}</span>
    <span aria-hidden="true">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
));

TabButton.displayName = "TabButton"; 