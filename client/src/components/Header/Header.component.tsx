import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "../UI/Container/Container.component";
import { Logo } from "./Logo/Logo.component";
import { DesktopNavigation } from "./Navigation/DesktopNavigation.component";
import { MobileMenu } from "./Navigation/MobileMenu/MobileMenu.component";
import { HeaderActions } from "./Navigation/HeaderActions/HeaderActions.component";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);

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
          <DesktopNavigation />
          <HeaderActions 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={handleMobileMenuToggle}
          />
        </nav>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        />
      </Container>
    </motion.header>
  );
};
