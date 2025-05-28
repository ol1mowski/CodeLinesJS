import { memo } from 'react';

interface UserAvatarProps {
  username: string;
  avatar?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar = memo(
  ({ username, size = 'md', className = '' }: UserAvatarProps) => {
    const firstLetter = username && typeof username === 'string' 
      ? username.charAt(0).toUpperCase() 
      : '?';

    const dimensions = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    const textSizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    };

    return (
      <div
        className={`
      rounded-full bg-js flex items-center justify-center text-black font-bold
      ${dimensions[size]} ${textSizes[size]} ${className}
    `}
      >
        {firstLetter}
      </div>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';
