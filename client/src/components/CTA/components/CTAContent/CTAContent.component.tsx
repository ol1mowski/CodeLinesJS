import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../UI/hooks/useMobileDetect.hook';
import { PrimaryCTA } from './components/PrimaryCTA/PrimaryCTA.component';
import { DualCTA } from './components/DualCTA/DualCTA.component';
import { SecondaryCTA } from './components/SecondaryCTA/SecondaryCTA.component';

export const CTAContent = () => {
  const isMobile = useMobileDetect();

  const content = (
    <div className="w-full max-w-7xl mx-auto">
      <PrimaryCTA />
      <DualCTA />
      <SecondaryCTA />
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
}; 