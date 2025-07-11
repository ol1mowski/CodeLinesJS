import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { CVHeader } from './CVHeader.component';
import { TipCard } from '../Tips/TipCard.component';
import { ExampleCard } from '../Examples/ExampleCard.component';
import type { CVTip, CVExample } from '../../types/cv.types';

interface CVDetailViewProps {
  title: string;
  description: string;
  type: 'tips' | 'examples';
  items: CVTip[] | CVExample[];
  loading: boolean;
  hasMore: boolean;
  onBack: () => void;
  onLoadMore: () => void;
}

export const CVDetailView: React.FC<CVDetailViewProps> = memo(({
  title,
  description,
  type,
  items,
  loading,
  hasMore,
  onBack,
  onLoadMore
}) => (
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

        {loading && (
          <div className="flex justify-center py-8">
            <FaSpinner className="w-8 h-8 text-js animate-spin" />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6"
        >
          {type === 'tips' ? (
            (items as CVTip[]).map((tip, index) => (
              <TipCard
                key={tip.id}
                tip={tip}
                index={index}
              />
            ))
          ) : (
            (items as CVExample[]).map((example, index) => (
              <ExampleCard
                key={example.id}
                example={example}
                index={index}
              />
            ))
          )}

          {hasMore && !loading && (
            <div className="flex justify-center py-4">
              <button
                onClick={onLoadMore}
                className="px-6 py-2 bg-js/20 hover:bg-js/30 border border-js/30 
                         rounded-lg text-js font-medium transition-colors"
              >
                Załaduj więcej
              </button>
            </div>
          )}

          {items.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400">
                <p className="text-lg mb-2">Brak wyników</p>
                <p className="text-sm">Spróbuj zmienić kryteria wyszukiwania</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  </div>
));

CVDetailView.displayName = 'CVDetailView'; 