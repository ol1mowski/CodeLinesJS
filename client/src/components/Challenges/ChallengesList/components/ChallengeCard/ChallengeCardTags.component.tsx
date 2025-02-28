import { memo } from 'react';

type Props = {
  tags: string[];
};

export const ChallengeCardTags = memo(({ tags }: Props) => (
  <div className="flex gap-2 flex-wrap">
    {tags.map((tag) => (
      <span
        key={tag}
        className="text-xs px-2 py-1 rounded-full bg-js/10 text-js"
      >
        {tag}
      </span>
    ))}
  </div>
));

ChallengeCardTags.displayName = 'ChallengeCardTags'; 