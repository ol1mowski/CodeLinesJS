import { Container } from "../UI/Container/Container.component";
import { FooterContent } from "./FooterContent/FooterContent.component";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { 
    icon: FaGithub, 
    href: "https://github.com/ol1mowski",
    bgColor: "bg-[#333]/20",
    textColor: "text-white",
    hoverBg: "hover:bg-[#333]/20",
    iconColor: "group-hover:text-white"
  },
  { 
    icon: FaYoutube, 
    href: "https://youtube.com/@oliwier.markiewicz",
    bgColor: "bg-[#FF0000]/10",
    textColor: "text-[#FF0000]",
    hoverBg: "hover:bg-[#FF0000]/20",
    iconColor: "group-hover:text-white"
  },
  { 
    icon: FaLinkedin, 
    href: "https://www.linkedin.com/in/oliwier-markiewicz-47857228a/",
    bgColor: "bg-[#0077B5]/10",
    textColor: "text-[#0077B5]",
    hoverBg: "hover:bg-[#0077B5]/20",
    iconColor: "group-hover:text-white"
  }
];

export const Footer = () => (
  <footer className="w-full relative py-16 md:py-24 bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '30px 30px'
           }}
      />
    </div>

    <Container className="relative z-10">
      <div className="flex flex-col gap-16">
        <FooterContent />
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400"
            >
              © 2024 Aplikację wykonał{' '}
              <a href="https://oliwiermarkiewicz.pl/" target="_blank" rel="noopener noreferrer" className="text-[#f7df1e] hover:text-[#f7df1e]/80">
                Oliwier Markiewicz
              </a>
            </motion.p>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
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
          </div>
        </div>
      </div>
    </Container>
  </footer>
);
