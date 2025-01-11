import { motion } from "framer-motion";
import { IconType } from "react-icons";

type FeatureCardProps = {
  Icon: IconType;
  title: string;
  description: string;
  index: number;
};

export const FeatureCard = ({ Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.6,
      delay: index * 0.15,
      ease: "easeOut"
    }}
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className="group p-6 rounded-xl border border-js/10 bg-dark/30 backdrop-blur-sm
               hover:border-js/20 hover:bg-dark/50 transition-all duration-300
               hover:shadow-lg hover:shadow-js/5"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-js/10 text-js 
                     group-hover:bg-js/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold font-space text-js mb-2 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
); 