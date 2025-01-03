import { motion } from "framer-motion";
import { features } from "../../../data/featuresData.data";

import { FeatureCard } from "./FeatureCard.component";


export const FeaturesList = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full xl:w-1/2 px-4 md:px-0"
  >
    {features.map((feature, index) => (
      <FeatureCard
        key={feature.title}
        {...feature}
        index={index}
      />
    ))}
  </motion.div>
); 