import { memo } from 'react';
import { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
};

export const TimelineIcon = memo(({ Icon }: Props) => (
  <div className="relative">
    <div className="w-11 h-11 rounded-full bg-js/10 border border-js/20 flex items-center justify-center text-js">
      <Icon className="w-5 h-5" />
    </div>
  </div>
));

TimelineIcon.displayName = 'TimelineIcon';
