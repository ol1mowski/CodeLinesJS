import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { features } from "../../../data/featuresData.data";

interface Feature {
  title: string;
  description: string;
  Icon: IconType;
}

export const FeaturesList = () => (
  <div className="w-full xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 xl:px-0">
    {features.map((feature: Feature, index: number) => (
      <motion.div
        key={feature.title}
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
        className="group p-6 rounded-xl border border-[#f7df1e]/10 bg-[#1a1a1a]/30 backdrop-blur-sm
                   hover:border-[#f7df1e]/20 hover:bg-[#1a1a1a]/50 transition-all duration-300
                   hover:shadow-lg hover:shadow-[#f7df1e]/5"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e] 
                         group-hover:bg-[#f7df1e]/20 group-hover:scale-110 transition-all duration-300">
            <feature.Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-space text-[#f7df1e] mb-2 group-hover:translate-x-1 transition-transform duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
); 