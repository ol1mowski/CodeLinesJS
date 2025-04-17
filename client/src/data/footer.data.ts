import { IconType } from 'react-icons';
import { FaGithub, FaTwitter, FaDiscord, FaYoutube } from 'react-icons/fa';

type SocialLink = {
  name: string;
  url: string;
  Icon: IconType;
};

type FooterLink = {
  text: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    Icon: FaGithub,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    Icon: FaTwitter,
  },
  {
    name: 'Discord',
    url: 'https://discord.com',
    Icon: FaDiscord,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    Icon: FaYoutube,
  },
];

export const footerLinks: FooterSection[] = [
  {
    title: 'Gra',
    links: [
      { text: 'Rozpocznij', url: '/start' },
      { text: 'Ranking', url: '/ranking' },
      { text: 'Osiągnięcia', url: '/achievements' },
      { text: 'Wyzwania', url: '/challenges' },
    ],
  },
  {
    title: 'Społeczność',
    links: [
      { text: 'Discord', url: '/discord' },
      { text: 'Forum', url: '/forum' },
      { text: 'Blog', url: '/blog' },
      { text: 'Wydarzenia', url: '/events' },
    ],
  },
  {
    title: 'Informacje',
    links: [
      { text: 'O nas', url: '/about' },
      { text: 'Kontakt', url: '/contact' },
      { text: 'FAQ', url: '/faq' },
      { text: 'Regulamin', url: '/terms' },
    ],
  },
];
