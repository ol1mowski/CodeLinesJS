import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { AnimationVariants } from '../../../../types/recruitment.types';

interface CVInfoSectionProps {
  variants: AnimationVariants;
}

export const CVInfoSection: React.FC<CVInfoSectionProps> = memo(({ variants }) => (
  <motion.div
    variants={variants}
    className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
  >
    <h3 className="text-lg font-bold text-white mb-4">
      💡 Dlaczego te porady są skuteczne?
    </h3>
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
      <div className="space-y-2">
        <h4 className="font-semibold text-js">Sprawdzone metody</h4>
        <p>
          Każda rada jest oparta na doświadczeniu rekruterów IT i 
          feedback od programistów, którzy znaleźli pracę.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-js">Konkretne przykłady</h4>
        <p>
          Zamiast ogólnych wskazówek, pokazujemy dokładnie co napisać 
          i jak to zrobić - z przykładami "dobrze" vs "źle".
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-js">Dla programistów</h4>
        <p>
          Wszystkie porady są specjalnie dostosowane do branży IT 
          i tego, na co rekruterzy zwracają uwagę w CV developerów.
        </p>
      </div>
    </div>
  </motion.div>
));

CVInfoSection.displayName = 'CVInfoSection'; 