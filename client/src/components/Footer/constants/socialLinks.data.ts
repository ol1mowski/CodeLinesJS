import { FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { SocialLink } from '../types/types';

export const socialLinks: SocialLink[] = [
  {
    icon: FaGithub,
    href: 'https://github.com/ol1mowski',
    bgColor: 'bg-[#333]/20',
    textColor: 'text-white',
    hoverBg: 'hover:bg-[#333]/20',
    iconColor: 'group-hover:text-white',
  },
  {
    icon: FaYoutube,
    href: 'https://youtube.com/@oliwier.markiewicz',
    bgColor: 'bg-[#FF0000]/10',
    textColor: 'text-[#FF0000]',
    hoverBg: 'hover:bg-[#FF0000]/20',
    iconColor: 'group-hover:text-white',
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/oliwier-markiewicz-47857228a/',
    bgColor: 'bg-[#0077B5]/10',
    textColor: 'text-[#0077B5]',
    hoverBg: 'hover:bg-[#0077B5]/20',
    iconColor: 'group-hover:text-white',
  },
];
