import { memo } from 'react';
import { motion } from "framer-motion";
import { FooterSection } from '../types/type';

type FooterLinksProps = {
  sections: FooterSection[];
};

export const FooterLinks = memo(({ sections }: FooterLinksProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {sections.map((section) => (
      <div key={section.title}>
        <h3 className="font-bold text-js mb-4">{section.title}</h3>
        <ul className="space-y-2">
          {section.links.map((link) => (
            <motion.li
              key={link.label}
              whileHover={{ x: 5 }}
              className="text-gray-400 hover:text-js transition-colors duration-200"
            >
              <a href={link.href} className="flex items-center gap-2">
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    ))}
  </div>
));

FooterLinks.displayName = 'FooterLinks'; 