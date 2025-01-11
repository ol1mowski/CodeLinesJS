import { memo } from 'react';
import { motion } from 'framer-motion';

import { challengesList } from './constants/challengesList.data';
import { containerAnimation, itemAnimation } from './constants/animations';
import { ChallengeCard } from './components/ChallengeCard/ChallengeCard.component';

export const ChallengesList = memo(() => (
  <motion.div 
    variants={containerAnimation}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="w-full xl:w-1/2 grid sm:grid-cols-2 gap-4"
  >
    {challengesList.map((challenge) => (
      <motion.div key={challenge.title} variants={itemAnimation}>
        <ChallengeCard {...challenge} />
      </motion.div>
    ))}
  </motion.div>
));

ChallengesList.displayName = 'ChallengesList'; 