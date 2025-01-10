import { memo } from 'react';
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Button } from "../../UI/Button/Button.component";
import { MobileMenuButton } from "./MobileMenu/MobileMenuButton.component";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const HeaderActions = memo(({ isMobileMenuOpen, onMobileMenuToggle }: HeaderActionsProps) => (
  <div className="flex items-center gap-10">
    <GitHubLink />
    <LoginButton />
    <MobileMenuButton
      isOpen={isMobileMenuOpen}
      onClick={onMobileMenuToggle}
    />
  </div>
));

const GitHubLink = memo(() => (
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
));

const LoginButton = memo(() => (
  <Button className="hidden xl:flex text-sm px-5 py-2.5">
    Zaloguj się
  </Button>
));

GitHubLink.displayName = 'GitHubLink';
LoginButton.displayName = 'LoginButton';
HeaderActions.displayName = 'HeaderActions'; 