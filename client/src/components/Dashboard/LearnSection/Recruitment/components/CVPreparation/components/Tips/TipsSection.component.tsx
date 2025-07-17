import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CVHeader } from '../Common/CVHeader.component';
import { TipCard } from './TipCard.component';
import type { CVView } from '../../types/cv.types';
import { useCVPreparation } from '../../hooks/useCVPreparation.hook';

interface TipsSectionProps {
  onBack: () => void;
  category: CVView;
}

export const TipsSection: React.FC<TipsSectionProps> = memo(({ onBack, category }) => {
  const { tips } = useCVPreparation();
  const { filteredTips, title, description } = useMemo(() => {
    const categoryMap = {
      'content-tips': {
        title: 'Treść i zawartość',
        description: 'Jak napisać CV które sprzeda Twoje umiejętności',
        categories: ['content']
      },
      'technical-tips': {
        title: 'Umiejętności techniczne',
        description: 'Jak prezentować projekty i technologie',
        categories: ['skills', 'projects']
      },
      'design-tips': {
        title: 'Formatowanie i design',
        description: 'Jak sprawić żeby CV wyglądało profesjonalnie',
        categories: ['design']
      }
    };

    const config = categoryMap[category as keyof typeof categoryMap];
    const filtered = config ? tips.filter(tip => config.categories.includes(tip.category)) : tips;

    return {
      filteredTips: filtered,
      title: config?.title || 'Porady i wskazówki',
      description: config?.description || 'Sprawdzone metody na stworzenie CV'
    };
  }, [category]);

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <CVHeader
            title={title}
            description={description}
            onBack={onBack}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            {filteredTips.map((tip, index) => (
              <TipCard
                key={tip.id}
                tip={tip}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

TipsSection.displayName = 'TipsSection'; 