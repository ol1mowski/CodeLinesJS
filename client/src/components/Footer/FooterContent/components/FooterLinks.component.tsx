import { memo } from 'react';
import { motion } from 'framer-motion';
import { FooterLink } from '../types/types';
import { useMobileDetect } from '../../../hooks/useMobileDetect.hook';

type FooterLinksProps = {
  title: string;
  links: FooterLink[];
  delay?: number;
};

export const FooterLinks = memo(({ title, links, delay = 0 }: FooterLinksProps) => {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return (
      <div>
        <h4 className="text-lg font-bold text-[#f7df1e] mb-4">{title}</h4>
        <ul className="space-y-3">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-3 text-gray-400 hover:text-[#f7df1e] transition-colors"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <h4 className="text-lg font-bold text-[#f7df1e] mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map(link => (
          <motion.li key={link.label} whileHover={{ x: 5 }}>
            <a
              href={link.href}
              className="flex items-center gap-3 text-gray-400 hover:text-[#f7df1e] transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});

FooterLinks.displayName = 'FooterLinks';
