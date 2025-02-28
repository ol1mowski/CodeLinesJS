import { motion } from "framer-motion";
import { FaRocket, FaCode } from "react-icons/fa";

export const ActionButtons = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mb-12"
  >
    <StartGameButton />
    <TryDemoButton />
  </motion.div>
);

const StartGameButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#f7df1e] text-black font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25 text-sm sm:text-base"
  >
    <FaRocket className="text-lg sm:text-xl" />
    Zacznij Grę
  </motion.button>
);

const TryDemoButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#f7df1e]/50 text-[#f7df1e] font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/10 transition-all text-sm sm:text-base"
  >
    <FaCode className="text-lg sm:text-xl" />
    Wypróbuj Demo
  </motion.button>
); 