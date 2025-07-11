import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCVPreparation } from './hooks/useCVPreparation.hook';
import { CVHeader } from './components/Common/CVHeader.component';
import { CVSectionCard } from './components/Common/CVSectionCard.component';
import { TipCard } from './components/Tips/TipCard.component';
import { ExampleCard } from './components/Examples/ExampleCard.component';
import { cvTips, cvExamples } from './data/cvData.data';

interface CVPreparationSectionProps {
  onBack: () => void;
}

export const CVPreparationSection: React.FC<CVPreparationSectionProps> = memo(({ onBack }) => {
  const {
    currentView,
    cvPreparationSections,
    containerVariants,
    itemVariants,
    handleSectionClick,
    handleBackToMain
  } = useCVPreparation();

  const filteredContent = useMemo(() => {
    const categoryMap: Record<string, { title: string; description: string; categories: string[] }> = {
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
      },
      'examples': {
        title: 'Przykłady opisów',
        description: 'Gotowe opisy projektów i doświadczenia',
        categories: ['examples']
      }
    };

    const config = categoryMap[currentView];
    if (!config) return null;

    if (currentView === 'examples') {
      return {
        title: config.title,
        description: config.description,
        items: cvExamples,
        type: 'examples' as const
      };
    } else {
      const filteredTips = cvTips.filter(tip => config.categories.includes(tip.category));
      return {
        title: config.title,
        description: config.description,
        items: filteredTips,
        type: 'tips' as const
      };
    }
  }, [currentView]);

  if (filteredContent) {
    return (
      <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <CVHeader
              title={filteredContent.title}
              description={filteredContent.description}
              onBack={handleBackToMain}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid gap-6"
            >
              {filteredContent.type === 'tips' ? (
                filteredContent.items.map((item, index) => (
                  <TipCard
                    key={item.id}
                    tip={item as any}
                    index={index}
                  />
                ))
              ) : (
                filteredContent.items.map((item, index) => (
                  <ExampleCard
                    key={item.id}
                    example={item as any}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <CVHeader
            title="Przygotowanie CV"
            description="Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów i wyróżni Cię na rynku pracy"
            onBack={onBack}
          />

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {cvPreparationSections.map(section => (
              <CVSectionCard
                key={section.id}
                section={section}
                variants={itemVariants}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </motion.div>


          <motion.div
            variants={itemVariants}
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
                  i jak to zrobić - ze przykładami "dobrze" vs "źle".
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
        </motion.div>
      </div>
    </div>
  );
});

CVPreparationSection.displayName = 'CVPreparationSection'; 