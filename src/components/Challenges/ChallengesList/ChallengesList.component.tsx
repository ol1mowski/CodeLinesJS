import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChallengeCard } from './components/ChallengeCard.component';
import { challengesList } from './challengesList.data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ChallengesList = memo(() => (
  <motion.div 
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="w-full xl:w-1/2 grid sm:grid-cols-2 gap-4"
  >
    {challengesList.map((challenge) => (
      <motion.div key={challenge.title} variants={item}>
        <ChallengeCard {...challenge} />
      </motion.div>
    ))}
  </motion.div>
));

ChallengesList.displayName = 'ChallengesList'; 