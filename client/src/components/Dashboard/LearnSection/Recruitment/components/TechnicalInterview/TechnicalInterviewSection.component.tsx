import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaArrowLeft, FaBook, FaCode, FaLaptopCode } from 'react-icons/fa';

type TechnicalInterviewSectionProps = {
  onBack: () => void;
};

const interviewBlocks = [
  {
    id: 'theory',
    title: 'Teoria',
    description: 'Podstawowe koncepty i wiedza teoretyczna niezbędna podczas rozmów technicznych',
    icon: FaBook,
    topics: [
      'Podstawy JavaScript (var, let, const)',
      'Hoisting i scope',
      'Closures i funkcje wyższego rzędu',
      'Prototypy i dziedziczenie',
      'Event loop i asynchroniczność',
      'ES6+ nowe funkcjonalności',
    ],
  },
  {
    id: 'practice',
    title: 'Praktyka',
    description: 'Zadania praktyczne i przykłady kodu często pojawiające się na rozmowach',
    icon: FaCode,
    topics: [
      'Algorytmy sortowania i wyszukiwania',
      'Manipulacja tablicami i obiektami',
      'Zadania z rekurencją',
      'Problemy z string-ami',
      'Live coding challenges',
      'Debugowanie kodu',
    ],
  },
];

export const TechnicalInterviewSection = memo(({ onBack }: TechnicalInterviewSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-js transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="text-sm">Powrót</span>
            </motion.button>
            <div className="w-px h-5 bg-gray-600 mx-2" />
            <FaLaptopCode className="w-5 h-5 text-js" />
            <h3 className="text-xl font-bold text-js">Przygotowanie do rozmowy technicznej</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Naucz się odpowiadać na pytania techniczne i rozwiązywać zadania programistyczne na żywo
          </p>
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {interviewBlocks.map(block => (
          <motion.div
            key={block.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-700/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-js/10 border border-js/20">
                <block.icon className="w-6 h-6 text-js" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-js transition-colors">
                  {block.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {block.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Tematy do nauki:</h4>
              <ul className="space-y-2">
                {block.topics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-js rounded-full" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Dostępność:</span>
                <span className="text-xs bg-js/10 text-js px-2 py-1 rounded border border-js/20">
                  Wkrótce dostępne
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaLaptopCode className="w-5 h-5 text-js" />
          <h3 className="text-lg font-bold text-white">Porady na rozmowę techniczną</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-js text-sm">Przed rozmową</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Przejrzyj podstawy JavaScript</li>
              <li>• Przygotuj pytania do firmy</li>
              <li>• Przetestuj kamerę i mikrofon</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-js text-sm">W trakcie rozmowy</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Myśl na głos</li>
              <li>• Zadawaj pytania doprecyzowujące</li>
              <li>• Nie bój się przyznać do niewiedzy</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-js text-sm">Live coding</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Zacznij od prostego rozwiązania</li>
              <li>• Testuj kod na przykładach</li>
              <li>• Optymalizuj tylko na końcu</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

TechnicalInterviewSection.displayName = 'TechnicalInterviewSection'; 