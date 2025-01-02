import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "../UI/Container/Container.component";
import { Logo } from "./Logo/Logo.component";
import { NavLinks } from "./Navigation/NavLinks.component";
import { MobileMenuButton } from "./Navigation/MobileMenu/MobileMenuButton.component";
import { MobileMenu } from "./Navigation/MobileMenu/MobileMenu.component";
import { useScrollEffect } from "./hooks/useScrollEffect.hook";

export const Header = () => {
  const isScrolled = useScrollEffect(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Logo />
          <NavLinks />
          <MobileMenuButton 
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </nav>
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </Container>
    </motion.header>
  );
};
