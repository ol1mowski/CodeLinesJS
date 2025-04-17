import { memo } from 'react';
import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

import { ChallengeCardHeader } from './ChallengeCardHeader.component';
import { ChallengeCardContent } from './ChallengeCardContent.component';
import { ChallengeCardTags } from './ChallengeCardTags.component';
import { cardAnimation } from '../../constants/animations';
import { getDifficultyColor } from '../../constants/difficultyColors';
import { ChallengeCardProps } from '../../types';

export const ChallengeCard = memo(
  ({ title, description, icon, difficulty, tags }: ChallengeCardProps) => {
    const isMobile = useMobileDetect();

    if (isMobile) {
      return (
        <div className="p-6 rounded-xl border border-js/20 bg-dark/50 backdrop-blur-sm space-y-4">
          <ChallengeCardHeader
            title={title}
            difficulty={difficulty}
            Icon={icon}
            difficultyColor={getDifficultyColor(difficulty)}
          />
          <ChallengeCardContent description={description} />
          <ChallengeCardTags tags={tags} />
        </div>
      );
    }

    return (
      <motion.div
        whileHover={cardAnimation.hover}
        className="p-6 rounded-xl border border-js/20 bg-dark/50 backdrop-blur-sm space-y-4"
      >
        <ChallengeCardHeader
          title={title}
          difficulty={difficulty}
          Icon={icon}
          difficultyColor={getDifficultyColor(difficulty)}
        />
        <ChallengeCardContent description={description} />
        <ChallengeCardTags tags={tags} />
      </motion.div>
    );
  }
);

ChallengeCard.displayName = 'ChallengeCard';
