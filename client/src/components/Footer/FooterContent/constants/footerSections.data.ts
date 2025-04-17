import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaBook,
  FaRocket,
  FaCode,
  FaShieldAlt,
} from 'react-icons/fa';
import { FooterSection } from '../types/type';

export const footerSections: FooterSection[] = [
  {
    title: 'Społeczność',
    links: [
      { label: 'Discord', href: '#', icon: FaDiscord },
      { label: 'GitHub', href: '#', icon: FaGithub },
      { label: 'YouTube', href: '#', icon: FaYoutube },
    ],
  },
  {
    title: 'Nauka',
    links: [
      { label: 'Dokumentacja', href: '#', icon: FaBook },
      { label: 'Projekty', href: '#', icon: FaRocket },
      { label: 'Zadania', href: '#', icon: FaCode },
    ],
  },
  {
    title: 'Zasoby',
    links: [
      { label: 'Blog', href: '#', icon: FaBook },
      { label: 'Tutoriale', href: '#', icon: FaRocket },
      { label: 'FAQ', href: '#', icon: FaCode },
    ],
  },
  {
    title: 'Firma',
    links: [
      { label: 'O nas', href: '#', icon: FaBook },
      { label: 'Kontakt', href: '#', icon: FaRocket },
      { label: 'Kariera', href: '#', icon: FaCode },
      { label: 'Polityka Prywatności', href: '/polityka-prywatnosci', icon: FaShieldAlt },
    ],
  },
];
