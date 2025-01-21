import { memo } from 'react';

export const Loader = memo(() => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
  </div>
));

Loader.displayName = 'Loader'; 