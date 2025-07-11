import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCVPreparation } from './hooks/useCVPreparation.hook';
import { CVHeader } from './components/Common/CVHeader.component';
import { CVSectionCard } from './components/Common/CVSectionCard.component';
import { TipCard } from './components/Tips/TipCard.component';
import { ExampleCard } from './components/Examples/ExampleCard.component';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface CVPreparationSectionProps {
  onBack: () => void;
}

export const CVPreparationSection: React.FC<CVPreparationSectionProps> = memo(({ onBack }) => {
  const {
    currentView,
    tips,
    examples,
    stats,
    loading,
    error,
    cvPreparationSections,
    containerVariants,
    itemVariants,
    handleSectionClick,
    handleBackToMain,
    loadMore,
    hasMore,
  } = useCVPreparation();

  const filteredContent = useMemo(() => {
    const categoryMap: Record<string, { title: string; description: string }> = {
      'content-tips': {
        title: 'Treść i zawartość',
        description: 'Jak napisać CV które sprzeda Twoje umiejętności'
      },
      'technical-tips': {
        title: 'Umiejętności techniczne',
        description: 'Jak prezentować projekty i technologie'
      },
      'design-tips': {
        title: 'Formatowanie i design',
        description: 'Jak sprawić żeby CV wyglądało profesjonalnie'
      },
      'examples': {
        title: 'Przykłady opisów',
        description: 'Gotowe opisy projektów i doświadczenia'
      }
    };

    const config = categoryMap[currentView];
    if (!config) return null;

    if (currentView === 'examples') {
      return {
        title: config.title,
        description: config.description,
        items: examples,
        type: 'examples' as const
      };
    } else {
      return {
        title: config.title,
        description: config.description,
        items: tips,
        type: 'tips' as const
      };
    }
  }, [currentView, tips, examples]);


  if (error) {
    return (
      <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
        <div className="max-w-6xl mx-auto">
          <CVHeader
            title="Przygotowanie CV"
            description="Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów"
            onBack={onBack}
          />
          <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <FaExclamationTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (filteredContent && currentView !== 'main') {
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
              {filteredContent.type === 'tips' ? (
                filteredContent.items.map((tip, index) => (
                  <TipCard
                    key={tip.id}
                    tip={tip}
                    index={index}
                  />
                ))
              ) : (
                filteredContent.items.map((example, index) => (
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
                    onClick={loadMore}
                    className="px-6 py-2 bg-js/20 hover:bg-js/30 border border-js/30 
                             rounded-lg text-js font-medium transition-colors"
                  >
                    Załaduj więcej
                  </button>
                </div>
              )}

              {filteredContent.items.length === 0 && !loading && (
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

          {loading && !stats && (
            <div className="flex justify-center py-12">
              <FaSpinner className="w-8 h-8 text-js animate-spin" />
            </div>
          )}

          {stats && (
            <motion.div
              variants={itemVariants}
              className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-js">{stats.totalTips}</div>
                  <div className="text-sm text-gray-400">Dostępnych porad</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-js">{stats.totalExamples}</div>
                  <div className="text-sm text-gray-400">Gotowych przykładów</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-js">
                    {stats.userProgress?.completionPercentage || 0}%
                  </div>
                  <div className="text-sm text-gray-400">Ukończono</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-js">
                    {stats.userProgress?.tipsViewed || 0}
                  </div>
                  <div className="text-sm text-gray-400">Przeczytanych porad</div>
                </div>
              </div>
            </motion.div>
          )}

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
        </motion.div>
      </div>
    </div>
  );
});

CVPreparationSection.displayName = 'CVPreparationSection'; 