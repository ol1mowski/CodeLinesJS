import { memo } from 'react';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = memo(({ href, children, className = '' }: NavLinkProps) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.05 }}
    className={`relative text-base text-gray-400 hover:text-js font-mono 
               transition-colors duration-200 py-2 group ${className}`}
  >
    {children}
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-js 
                    group-hover:w-full transition-all duration-300"
    />
  </motion.a>
));

NavLink.displayName = 'NavLink';
