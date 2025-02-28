import { FaDiscord, FaGithub, FaYoutube, FaBook, FaRocket, FaCode } from "react-icons/fa";
import { FooterLinks } from '../types/types';

export const links: FooterLinks = {
  resources: [
    { label: "Dokumentacja", href: "#", icon: FaBook },
    { label: "Przykłady", href: "#", icon: FaCode },
    { label: "Roadmapa", href: "#", icon: FaRocket }
  ],
  social: [
    { label: "Discord", href: "#", icon: FaDiscord },
    { label: "GitHub", href: "#", icon: FaGithub },
    { label: "YouTube", href: "#", icon: FaYoutube }
  ]
}; 