import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { SettingsSidebar } from './SettingsSidebar/SettingsSidebar.component';
import { SettingsContent } from './SettingsContent/SettingsContent.component';
import { SEO } from '../../../utils/seo.util';

type SettingsView = 'profile' | 'security' | 'preferences' | 'delete';

export const SettingsSection = memo(() => {
  const [activeView, setActiveView] = useState<SettingsView>('profile');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full p-6 gap-6"
    >
      <SEO
        title="Ustawienia"
        description="Ustawienia CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        type="website"
      />
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold font-space text-js">Ustawienia</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SettingsSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="lg:col-span-3">
          <SettingsContent activeView={activeView} />
        </div>
      </div>
    </motion.div>
  );
});

SettingsSection.displayName = 'SettingsSection';
