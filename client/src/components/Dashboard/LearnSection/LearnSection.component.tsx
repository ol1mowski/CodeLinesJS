import { motion } from 'framer-motion';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionTitle } from '../../UI/SectionTitle/SectionTitle.component';
import { Lessons } from './Lessons/Lessons.component';
import { Resources } from './Resources/Resources.component';
import { LearningPaths } from './LearningPaths/LearningPaths.component';
import { LearnTabs } from './LearnTabs/LearnTabs.component';
import { Recruitment } from './Recruitment/Recruitment.component';
import { useAuth } from '../../Auth/hooks/useAuth.hook';
import { LoadingSpinner } from '../../UI/LoadingSpinner/LoadingSpinner.component';
import { SEO } from '../../../utils/seo.util';

type TabType = 'paths' | 'lessons' | 'resources' | 'articles' | 'recruitment';

export const LearnSection = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, isAuthChecking } = useAuth();

  const activeTab = (searchParams.get('tab') as TabType) || 'paths';

  const handleTabChange = (tab: TabType) => {
    setSearchParams(prev => {
      if (tab === 'paths') {
        prev.delete('tab');
        prev.delete('filter');
      } else {
        prev.set('tab', tab);
      }
      return prev;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (isAuthChecking || !isAuthenticated) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner text="Sprawdzanie autoryzacji..." />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <SEO
        title="Nauka"
        description="Nauka JavaScript - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          title="Nauka JavaScript"
          subtitle="Wybierz swoją ścieżkę nauki i rozpocznij przygodę z JS"
          className="mb-8"
          titleClassName="text-js drop-shadow-lg"
          subtitleClassName="text-gray-400"
        />

        <div className="bg-dark-800/50 border border-js/10 rounded-xl p-6">
          <LearnTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="mt-8"
          >
            {activeTab === 'paths' && <LearningPaths />}
            {activeTab === 'lessons' && <Lessons />}
            {activeTab === 'resources' && <Resources />}
            {activeTab === 'recruitment' && <Recruitment />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

LearnSection.displayName = 'LearnSection';
