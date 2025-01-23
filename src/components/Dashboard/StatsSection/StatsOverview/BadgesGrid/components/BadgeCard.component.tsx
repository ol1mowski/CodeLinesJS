import { memo } from "react";
import { motion } from "framer-motion";

import { useFormatDate } from "../hooks/useFormatDate";
import { item } from "../animations";
import { Badge } from "../../../../../../types/stats.types";

type BadgeCardProps = {
  badge: Badge;
};

export const BadgeCard = memo(({ badge }: BadgeCardProps) => {
  const formatDate = useFormatDate();

  return (
    <motion.div
      key={badge.id}
      variants={item}
      className="flex flex-col items-center p-4 bg-dark/30 rounded-lg border border-js/10 hover:border-js/30 transition-colors"
    >
      <span className="text-3xl mb-2">{badge.icon || '🏆'}</span>
      <h4 className="text-js font-medium text-sm text-center">
        {badge.name}
      </h4>
      <p className="text-gray-400 text-xs mt-1">
        {formatDate(badge.earnedAt)}
      </p>
      {badge.description && (
        <p className="text-gray-400 text-xs mt-1 text-center">
          {badge.description}
        </p>
      )}
    </motion.div>
  );
});

BadgeCard.displayName = "BadgeCard"; 