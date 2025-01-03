import { motion } from "framer-motion";

import { RoadmapStep } from "./RoadmapStep.component";
import { roadmapSteps } from "../../../data/roadmapSteps.data";

export const RoadmapList = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="w-full xl:w-1/2 px-4 md:px-0 relative"
  >
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-500/20 via-pink-500/20 to-transparent" />
    {roadmapSteps.map((step, index) => (
      <RoadmapStep
        key={step.title}
        {...step}
        index={index}
      />
    ))}
  </motion.div>
); 