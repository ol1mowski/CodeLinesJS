import { motion } from "framer-motion";
import { progressStats } from "../../../data/progressStats.data";
import { StatCard } from "./StatCard.component";


export const ProgressStats = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full xl:w-1/2 px-4 md:px-0"
  >
    {progressStats.map((stat, index) => (
      <StatCard
        key={stat.title}
        {...stat}
        index={index}
      />
    ))}
  </motion.div>
); 