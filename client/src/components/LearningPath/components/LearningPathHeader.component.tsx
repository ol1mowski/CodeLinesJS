import { SectionTitle } from "../../UI/SectionTitle/SectionTitle.component";
import { motion } from "framer-motion";

export const LearningPathHeader = () => (
  <div className="w-full flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="px-4 py-2 bg-[#f7df1e]/10 border border-[#f7df1e]/20 rounded-full text-[#f7df1e] font-semibold text-sm inline-block">
        Krok 1: Teoria
      </div>
    </motion.div>
    
    <SectionTitle
      title="Zbuduj Solidne Fundamenty"
      subtitle="Rozpocznij swoją przygodę z JavaScript od zrozumienia kluczowych koncepcji"
      className="text-center px-4"
      titleClassName="text-[#f7df1e] drop-shadow-lg"
      subtitleClassName="text-gray-400"
    />
  </div>
); 