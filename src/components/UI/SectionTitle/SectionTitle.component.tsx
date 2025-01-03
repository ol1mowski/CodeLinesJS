import { motion } from "framer-motion";

type SectionTitleProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export const SectionTitle = ({ title, subtitle, className = "" }: SectionTitleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
      {title}
    </h2>
    <p className="text-gray-300 text-lg md:text-xl font-inter max-w-2xl mx-auto">
      {subtitle}
    </p>
  </motion.div>
); 