import { memo } from 'react';
import { ActiveUsers } from './ActiveUsers.component';
import { ErrorBoundary } from '../../../Common/ErrorBoundary';

const CommunityFeed = memo(() => {
  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <ActiveUsers />
      </div>
    </ErrorBoundary>
  );
});

CommunityFeed.displayName = 'CommunityFeed';
export default CommunityFeed;
