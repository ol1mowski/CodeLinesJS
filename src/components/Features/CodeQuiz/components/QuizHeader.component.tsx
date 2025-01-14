import { memo } from 'react';

type QuizHeaderProps = {
  title: string;
  subtitle: string;
};

export const QuizHeader = memo(({ title, subtitle }: QuizHeaderProps) => (
  <div className="p-6 border-b border-js/10">
    <h3 className="text-xl font-bold font-space text-js mb-2">{title}</h3>
    <p className="text-gray-400">{subtitle}</p>
  </div>
));

QuizHeader.displayName = 'QuizHeader'; 