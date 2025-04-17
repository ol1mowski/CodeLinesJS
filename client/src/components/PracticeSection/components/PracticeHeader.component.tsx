import { SectionTitle } from '../../UI/SectionTitle/SectionTitle.component';
import { motion } from 'framer-motion';

export const PracticeHeader = () => (
  <div className="w-full flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-2"
    >
      <div className="px-4 py-1.5 bg-[#f7df1e]/10 border border-[#f7df1e]/20 rounded-full text-[#f7df1e] font-semibold text-sm inline-block">
        Krok 2: Praktyka
      </div>
    </motion.div>

    <SectionTitle
      title="Zastosuj Wiedzę w Praktyce"
      subtitle="Sprawdź swoje umiejętności w interaktywnych grach i wyzwaniach"
      className="text-center px-4"
      titleClassName="text-[#f7df1e] drop-shadow-lg"
      subtitleClassName="text-gray-400"
    />
  </div>
);
