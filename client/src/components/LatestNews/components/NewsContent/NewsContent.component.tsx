import { NewsHeader } from './NewsHeader/NewsHeader.component';
import { NewsCards } from './NewsCards/NewsCards.component';

export const NewsContent = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="space-y-12">
        <NewsHeader />
        <NewsCards />
      </div>
    </div>
  );
}; 