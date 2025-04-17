import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

type FeatureCardProps = {
  title: string;
  description: string;
  Icon: IconType;
  index: number;
};

export const FeatureCard = ({ title, description, Icon, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-800/50 backdrop-blur-sm cursor-pointer rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-colors group"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <h3 className="text-xl font-bold font-space text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400 font-inter">{description}</p>
      </div>
    </div>
  </motion.div>
);
