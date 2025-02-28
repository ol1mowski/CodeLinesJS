import { motion } from "framer-motion";

export const MainHeading = () => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-[#f7df1e] mb-6"
  >
    Wejdź do Świata JavaScript
  </motion.h2>
); 