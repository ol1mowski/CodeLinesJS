import { memo } from 'react';
import { motion } from "framer-motion";
import { MainHeading } from './components/MainHeading.component';
import { Description } from './components/Description.component';
import { ActionButtons } from './components/ActionButtons.component';
import { StatsGrid } from './components/StatsGrid.component';

export const CallToActionContent = memo(() => (
  <div className="w-screen xl:w-1/2 px-4 md:px-0">
    <motion.div className="text-center xl:text-left">
      <MainHeading />
      <Description />
      <ActionButtons />
      <StatsGrid />
    </motion.div>
  </div>
));

CallToActionContent.displayName = 'CallToActionContent';
