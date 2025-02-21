import { memo } from 'react';
import { motion } from 'framer-motion';
import { TimelineIcon } from './TimelineIcon.component';
import { TimelineContent } from './TimelineContent.component';
import { TimelineStepProps } from '../../types';


export const TimelineStep = memo(({ title, description, duration, icon, skills, index }: TimelineStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-6"
  >
    <TimelineIcon Icon={icon} />
    <TimelineContent 
      title={title}
      description={description}
      duration={duration}
      skills={skills}
    />
  </motion.div>
));

TimelineStep.displayName = 'TimelineStep'; 