import { memo } from 'react';
import { MobileMenuButton } from "../MobileMenu/MobileMenuButton.component";
import { GitHubLink } from "./GitHubLink.component";
import { LoginButton } from "./LoginButton.component";

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

HeaderActions.displayName = 'HeaderActions'; 