import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { CVHeader } from '../Common/CVHeader.component';
import { cvExamples } from '../../data/cvData.data';
import { ExampleCard } from './ExampleCard.component';

interface ExamplesSectionProps {
  onBack: () => void;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = memo(({ onBack }) => {
  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <CVHeader
            title="Przykłady opisów"
            description="Sprawdzone przykłady opisów projektów, umiejętności i doświadczenia"
            onBack={onBack}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            {cvExamples.map((example, index) => (
              <ExampleCard
                key={example.id}
                example={example}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

ExamplesSection.displayName = 'ExamplesSection'; 