import { FaGithub, FaYoutube, FaUserSecret } from "react-icons/fa";
import { FooterLinks } from '../types/types';

export const links: FooterLinks = {
  resources: [
    { label: "Polityka prywatności", href: "/polityka-prywatnosci", icon: FaUserSecret }
  ],
  social: [
    { label: "GitHub", href: "https://github.com/ol1mowski/CodeLinesJS", icon: FaGithub },
    { label: "YouTube", href: "https://www.youtube.com/@oliwiermarkiewicz", icon: FaYoutube }
  ]
}; 