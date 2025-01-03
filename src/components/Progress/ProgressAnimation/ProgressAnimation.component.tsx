import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgressAnimation } from "./useProgressAnimation.hook";

export const ProgressAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useProgressAnimation(containerRef);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full xl:w-1/2 aspect-square relative px-4 md:px-0 min-h-[500px]"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}; 