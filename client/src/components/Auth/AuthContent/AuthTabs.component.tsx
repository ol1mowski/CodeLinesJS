import { motion } from 'framer-motion';
import { FaSignInAlt, FaUserPlus, FaKey } from 'react-icons/fa';

type AuthMode = 'login' | 'register' | 'forgot';

type AuthTabsProps = {
  activeTab: AuthMode;
  onTabChange: (mode: AuthMode) => void;
};

export const AuthTabs = ({ activeTab, onTabChange }: AuthTabsProps) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    <TabButton
      isActive={activeTab === 'login'}
      onClick={() => onTabChange('login')}
      icon={<FaSignInAlt />}
      label="Logowanie"
    />
    <TabButton
      isActive={activeTab === 'register'}
      onClick={() => onTabChange('register')}
      icon={<FaUserPlus />}
      label="Rejestracja"
    />
    <TabButton
      isActive={activeTab === 'forgot'}
      onClick={() => onTabChange('forgot')}
      icon={<FaKey />}
      label="Reset hasła"
    />
  </div>
);

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

const TabButton = ({ isActive, onClick, icon, label }: TabButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
      isActive ? 'bg-js/20 text-js' : 'text-gray-400 hover:text-js'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);
