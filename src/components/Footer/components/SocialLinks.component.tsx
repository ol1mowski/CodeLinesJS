import { memo } from 'react';
import { motion } from "framer-motion";
import { SocialLink } from '../types/types';

type SocialLinksProps = {
  links: SocialLink[];
};

export const SocialLinks = memo(({ links }: SocialLinksProps) => (
  <div className="flex items-center gap-3">
    {links.map((link, index) => (
      <motion.a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`p-2 rounded-lg ${link.bgColor} ${link.textColor} 
                   ${link.hoverBg} transition-all duration-300 group`}
      >
        <link.icon className={`w-5 h-5 transition-colors duration-300 ${link.iconColor}`} />
      </motion.a>
    ))}
  </div>
));

SocialLinks.displayName = 'SocialLinks'; 