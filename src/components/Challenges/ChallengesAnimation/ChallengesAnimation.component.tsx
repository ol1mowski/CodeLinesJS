import { useRef } from "react";
import { motion } from "framer-motion";
import { useChallengesAnimation } from "./useChallengesAnimation.hook";

export const ChallengesAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useChallengesAnimation(containerRef);

  return (
    <motion.div
      ref={containerRef}
      className="w-full xl:w-1/2 aspect-square relative min-h-[500px]"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}; 