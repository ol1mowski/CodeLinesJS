import { memo } from 'react';
import { FaStar } from 'react-icons/fa';

type XpBadgeProps = {
  xp: number;
};

export const XpBadge = memo(({ xp }: XpBadgeProps) => (
  <span className="flex items-center gap-1 text-js bg-js/10 px-2.5 py-1 rounded-lg text-sm">
    <FaStar className="w-4 h-4" />
    {xp} XP
  </span>
));

XpBadge.displayName = 'XpBadge';
