import { memo } from 'react';
import { motion } from "framer-motion";
import { useMobileDetect } from '../../../../hooks/useMobileDetect';

export const FooterIntro = memo(() => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return (
      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold text-[#f7df1e] mb-4">
          CodeLinesJs
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Platforma do nauki JavaScript stworzona z myślą o społeczności programistów. 
          Dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.
        </p>
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-2 bg-[#f7df1e] text-black font-medium rounded-lg 
                     hover:bg-[#f7df1e]/90 transition-colors"
          >
            Rozpocznij Naukę
          </button>
          <button
            className="px-6 py-2 border border-[#f7df1e]/20 text-[#f7df1e] font-medium rounded-lg
                     hover:bg-[#f7df1e]/10 transition-colors"
          >
            Dołącz do Nas
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-2"
    >
      <h3 className="text-xl font-bold text-[#f7df1e] mb-4">
        CodeLinesJs
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">
        Platforma do nauki JavaScript stworzona z myślą o społeczności programistów. 
        Dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.
      </p>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-[#f7df1e] text-black font-medium rounded-lg 
                   hover:bg-[#f7df1e]/90 transition-colors"
        >
          Rozpocznij Naukę
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-[#f7df1e]/20 text-[#f7df1e] font-medium rounded-lg
                   hover:bg-[#f7df1e]/10 transition-colors"
        >
          Dołącz do Nas
        </motion.button>
      </div>
    </motion.div>
  );
});

FooterIntro.displayName = 'FooterIntro'; 