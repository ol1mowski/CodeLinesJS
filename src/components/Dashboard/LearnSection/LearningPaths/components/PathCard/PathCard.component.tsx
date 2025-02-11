import { memo } from "react";
import { motion } from "framer-motion";
import type { LearningPath } from "../../../types/learning.types";
import { usePathCardData } from "./hooks/usePathCardData";
import { PathHeader } from "./PathHeader.component";
import { PathContent } from "./PathContent.component";
import { PathFooter } from "./PathFooter.component";

type PathCardProps = {
  path: LearningPath;
}


export const PathCard = memo(({ path }: PathCardProps) => {
  const { 
    safeData,
    cardStyles,
    hoverAnimation 
  } = usePathCardData(path);  

  return (
    <motion.div
      whileHover={hoverAnimation}
      className={cardStyles}
    >
      <div className="space-y-4">
        <PathHeader 
          title={safeData.title}
          isLocked={safeData.isLocked}
          requiredLevel={safeData.requiredLevel}
        />

        <PathContent 
          description={safeData.description}
          outcomes={safeData.outcomes}
          requirements={safeData.requirements}
        />

        <PathFooter 
          id={safeData.id}
          isLocked={safeData.isLocked}
          estimatedTime={safeData.estimatedTime}
          progress={safeData.progress}
        />
      </div>
    </motion.div>
  );
});

PathCard.displayName = "PathCard"; 