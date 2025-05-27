import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

export const GameDescription = () => {
  const isMobile = useMobileDetect();

  const content = (
    <div className="space-y-6">
      {/* Główny tytuł */}
      <h2 
        id="why-this-game-title"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-space leading-tight"
      >
        Dlaczego nasza gra zmieni Twoje podejście do programowania?
      </h2>

      {/* Pierwszy akapit */}
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
        Stworzona przez doświadczonych programistów i edukatorów, nasza gra 
        oferuje unikalne doświadczenie nauki JavaScript poprzez praktyczne 
        wyzwania, interaktywne projekty i realistyczne scenariusze.
      </p>

      {/* Drugi akapit */}
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
        Każdy poziom został starannie zaprojektowany, aby wprowadzić nowe 
        koncepty na podstawie solidnych fundamentów programistycznych. Na tyle 
        szczegółowo, że - Rozwiązuj prawdziwe problemy i rozwijaj umiejętności 
        krok po kroku.
      </p>

      {/* Lista punktów */}
      <div className="space-y-4 mt-8">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#f7df1e] rounded-full mt-3 shrink-0" />
          <p className="text-gray-300">
            <span className="text-[#f7df1e] font-semibold">Praktyczne wyzwania</span> - 
            Rozwiązuj rzeczywiste problemy programistyczne
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#f7df1e] rounded-full mt-3 shrink-0" />
          <p className="text-gray-300">
            <span className="text-[#f7df1e] font-semibold">Interaktywne środowisko</span> - 
            Testuj kod w czasie rzeczywistym
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#f7df1e] rounded-full mt-3 shrink-0" />
          <p className="text-gray-300">
            <span className="text-[#f7df1e] font-semibold">Progresywna nauka</span> - 
            Od podstaw do zaawansowanych konceptów
          </p>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
}; 