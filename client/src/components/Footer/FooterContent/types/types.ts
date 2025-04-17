import { IconType } from 'react-icons';

export type FooterLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type FooterLinks = {
  resources: FooterLink[];
  social: FooterLink[];
};
