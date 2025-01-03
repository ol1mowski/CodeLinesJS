import { useRef } from "react";
import { motion } from "framer-motion";

import { useRoadmapAnimation } from "./useRoadmapAnimation.hook";


export const RoadmapAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRoadmapAnimation(containerRef);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full xl:w-1/2 aspect-square px-4 md:px-0 min-h-[500px] sticky top-24"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}; 