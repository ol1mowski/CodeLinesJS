import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { CVHeader } from '../Common/CVHeader.component';

interface TemplatesSectionProps {
  onBack: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = memo(({ onBack }) => {
  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <CVHeader
            title="Szablony CV"
            description="Gotowe szablony CV dopasowane do różnych ról w branży IT"
            onBack={onBack}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-700/30 border border-js/10 rounded-xl p-8 text-center"
          >
            <div className="text-js text-6xl mb-4">🔨</div>
            <h3 className="text-xl font-bold text-white mb-2">Sekcja w budowie</h3>
            <p className="text-gray-400">
              Pracujemy nad profesjonalnymi szablonami CV dla programistów.
              Wkrótce dostępne będą szablony dla różnych poziomów doświadczenia.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

TemplatesSection.displayName = 'TemplatesSection'; 