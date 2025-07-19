import { memo } from 'react';
import { motion } from 'framer-motion';
import { PageBackground } from './components/PageBackground.component';
import { PageHeader } from './components/PageHeader.component';
import { ReportForm } from './components/ReportForm.component';
import { ContactSection } from './components/ContactSection.component';
import { usePageAnimations } from './hooks/usePageAnimations.hook';
import { SEO } from '../../../utils/seo.util';

export const ReportBugPage = memo(() => {
  const animations = usePageAnimations();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden">
      <PageBackground />
      <SEO
        title="Zgłoś Błąd"
        description="Zgłoś błąd w CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        type="website"
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-12"
        >
          <motion.div variants={animations.item}>
            <PageHeader />
          </motion.div>

          <motion.div variants={animations.item} className="w-full">
            <ReportForm />
          </motion.div>

          <motion.div variants={animations.item}>
            <ContactSection />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

ReportBugPage.displayName = 'ReportBugPage';
