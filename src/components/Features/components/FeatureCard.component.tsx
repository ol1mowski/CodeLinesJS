import { motion } from "framer-motion";
import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
};

export const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-dark-800 p-6 rounded-xl border border-[#f7df1e]/10 hover:border-[#f7df1e]/30 transition-colors"
  >
    <div className="w-12 h-12 bg-[#f7df1e]/10 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold font-space text-[#f7df1e] mb-2">{title}</h3>
    <p className="text-gray-400 font-inter">{description}</p>
  </motion.div>
); 