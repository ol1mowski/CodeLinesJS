import { memo } from 'react';

type Props = {
  description: string;
};

export const ChallengeCardContent = memo(({ description }: Props) => (
  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
));

ChallengeCardContent.displayName = 'ChallengeCardContent';
