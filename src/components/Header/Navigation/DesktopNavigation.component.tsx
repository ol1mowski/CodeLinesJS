import { memo } from 'react';
import { NavLinks } from "./NavLinks.component";

export const DesktopNavigation = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 hidden xl:block">
    <NavLinks />
  </div>
));

DesktopNavigation.displayName = 'DesktopNavigation'; 