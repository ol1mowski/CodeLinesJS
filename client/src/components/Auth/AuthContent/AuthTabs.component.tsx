type AuthMode = 'login' | 'register' | 'forgot';

type AuthTabsProps = {
  activeTab: AuthMode;
  onTabChange: (mode: AuthMode) => void;
};

export const AuthTabs = ({ activeTab, onTabChange }: AuthTabsProps) => (
  <div className="flex items-center justify-center gap-1 mb-6 sm:mb-8 bg-gray-50 rounded-lg p-1">
    <TabButton
      isActive={activeTab === 'login'}
      onClick={() => onTabChange('login')}
      label="Logowanie"
    />
    <TabButton
      isActive={activeTab === 'register'}
      onClick={() => onTabChange('register')}
      label="Rejestracja"
    />
    <TabButton
      isActive={activeTab === 'forgot'}
      onClick={() => onTabChange('forgot')}
      label="Reset hasła"
    />
  </div>
);

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
};

const TabButton = ({ isActive, onClick, label }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex-1 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 ${
      isActive 
        ? 'bg-white text-gray-900 border border-gray-900 border-2' 
        : 'bg-white text-gray-900'
    }`}
  >
    {label}
  </button>
);
