import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaLaptopCode, FaFileAlt, FaUsers, FaBriefcase } from 'react-icons/fa';

const recruitmentSections = [
  {
    id: 'technical-interview',
    title: 'Przygotowanie do rozmowy technicznej',
    description: 'Naucz się odpowiadać na pytania techniczne i rozwiązywać zadania programistyczne na żywo',
    icon: FaLaptopCode,
    features: [
      'Typowe pytania JavaScript',
      'Zadania algorytmiczne',
      'Code review na żywo',
      'Whiteboarding',
    ],
  },
  {
    id: 'cv-preparation',
    title: 'Przygotowanie CV',
    description: 'Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów i wyróżni Cię na rynku',
    icon: FaFileAlt,
    features: [
      'Szablony CV dla programistów',
      'Opis projektów i umiejętności',
      'Portfolio prezentacja',
      'LinkedIn optimization',
    ],
  },
];

export const Recruitment = memo(() => {
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
            <FaBriefcase className="w-5 h-5 text-js" />
            <h3 className="text-xl font-bold text-js">Rekrutacja</h3>
            <span className="px-2 py-0.5 bg-js/20 text-js text-xs font-bold rounded-full">
              NOWOŚĆ
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Przygotuj się profesjonalnie do procesu rekrutacji w IT
          </p>
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {recruitmentSections.map(section => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-700/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-js/10 border border-js/20">
                <section.icon className="w-6 h-6 text-js" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-js transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Co znajdziesz w tej sekcji:</h4>
              <ul className="space-y-2">
                {section.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-js rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status:</span>
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
          <FaUsers className="w-5 h-5 text-js" />
          <h3 className="text-lg font-bold text-white">Przygotuj się z nami!</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Nasze materiały rekrutacyjne zostały przygotowane przez doświadczonych programistów i rekruterów.
          Znajdziesz tu praktyczne porady, które pomogą Ci znaleźć wymarzoną pracę w IT.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
            <div className="text-js font-bold text-lg">100+</div>
            <div className="text-gray-400 text-sm">Pytań technicznych</div>
          </div>
          <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
            <div className="text-js font-bold text-lg">10+</div>
            <div className="text-gray-400 text-sm">Zadań praktycznych</div>
          </div>
          <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
            <div className="text-js font-bold text-lg">10+</div>
            <div className="text-gray-400 text-sm">Praktycznych porad jak stworzyć skuteczne CV</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

Recruitment.displayName = 'Recruitment'; 