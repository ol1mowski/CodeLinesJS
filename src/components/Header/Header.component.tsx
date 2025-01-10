import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../UI/Container/Container.component";
import { Logo } from "./Logo/Logo.component";
import { NavLinks } from "./Navigation/NavLinks.component";
import { MobileMenuButton } from "./Navigation/MobileMenu/MobileMenuButton.component";
import { MobileMenu } from "./Navigation/MobileMenu/MobileMenu.component";
import { Button } from "../UI/Button/Button.component";
import { FaGithub } from "react-icons/fa";
import { useHeaderScroll } from "./hooks/useHeaderScroll.hook";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useHeaderScroll();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 
        bg-dark-medium/90 backdrop-blur-xl border-b border-js-light py-5`}
    >
      <Container>
        <nav className="flex items-center justify-between relative">
          <Logo />
          <div className="absolute left-1/2 -translate-x-1/2 hidden xl:block">
            <NavLinks />
          </div>
          <div className="flex items-center gap-10">
            <motion.a
              href="https://github.com/yourusername/project"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 8 }}
              className="text-gray-400 hover:text-js transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
            <Button className="hidden xl:flex text-sm px-5 py-2.5">
              Zaloguj się
            </Button>
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </nav>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </Container>
    </motion.header>
  );
};
