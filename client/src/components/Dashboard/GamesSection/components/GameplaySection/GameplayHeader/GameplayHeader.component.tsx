import { memo } from 'react';

type GameplayHeaderProps = {
  title: string;
};

export const GameplayHeader = memo(({ title }: GameplayHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-js">{title}</h1>
    </div>
  );
});
