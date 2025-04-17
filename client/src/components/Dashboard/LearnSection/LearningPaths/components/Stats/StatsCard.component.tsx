import { memo } from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  icon: IconType;
  title: string;
  label: string;
  value: string | number;
}

export const StatsCard = memo(({ icon: Icon, title, label, value }: StatsCardProps) => (
  <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      <Icon className="w-5 h-5 text-js" />
      <h4 className="font-medium text-gray-200">{title}</h4>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-js">{value}</span>
    </div>
  </div>
));
