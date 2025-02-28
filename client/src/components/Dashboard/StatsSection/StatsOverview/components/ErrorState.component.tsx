import { memo } from 'react';

type ErrorStateProps = {
  message: string;
};

export const ErrorState = memo(({ message }: ErrorStateProps) => (
  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
    <p className="text-red-500">{message}</p>
  </div>
));

ErrorState.displayName = 'ErrorState'; 