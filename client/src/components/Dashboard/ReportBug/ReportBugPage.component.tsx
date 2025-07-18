import { memo } from 'react';
import { motion } from 'framer-motion';
import { PageBackground } from './components/PageBackground.component';
import { PageHeader } from './components/PageHeader.component';
import { ReportForm } from './components/ReportForm.component';
import { ContactSection } from './components/ContactSection.component';
import { usePageAnimations } from './hooks/usePageAnimations.hook';
import { Helmet } from 'react-helmet-async';

export const ReportBugPage = memo(() => {
  const animations = usePageAnimations();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden">
      <PageBackground />
      <Helmet>
        <title>Zgłoś Błąd | CodeLinesJS</title>
        <meta
          name="description"
          content="Zgłoś błąd w CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        />
      </Helmet>
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
