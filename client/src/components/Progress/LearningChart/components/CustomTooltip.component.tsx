import { memo } from 'react';
import { TooltipProps } from 'recharts';

export const CustomTooltip = memo(({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-dark/90 border border-js/20 p-4 rounded-lg shadow-lg">
      <p className="text-js font-bold mb-1">{label}</p>
      <p className="text-gray-400">
        <span className="text-js">Postęp:</span> {payload[0].value}%
      </p>
      <p className="text-gray-400">
        <span className="text-js">Zadania:</span> {payload[1].value}
      </p>
    </div>
  );
});

CustomTooltip.displayName = 'CustomTooltip';
