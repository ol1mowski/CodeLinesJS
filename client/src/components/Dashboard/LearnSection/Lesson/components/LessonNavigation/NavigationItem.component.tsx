import { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigationItemStyles } from './hooks/useNavigationItemStyles';

type NavigationItemProps = {
  title: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

export const NavigationItem = memo(({ title, isActive, onClick }: NavigationItemProps) => {
  const className = useNavigationItemStyles(isActive);

  return (
    <motion.button whileHover={{ x: 4 }} onClick={onClick} className={className}>
      {title}
    </motion.button>
  );
});

NavigationItem.displayName = 'NavigationItem';
