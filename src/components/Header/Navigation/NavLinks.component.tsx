import { memo } from 'react';
import { navigationLinks } from "./navigationData";
import { NavLink } from "./NavLink.component";

export const NavLinks = memo(() => (
  <nav className="flex items-center gap-10">
    {navigationLinks.map(({ href, label }) => (
      <NavLink key={href} href={href}>
        {label}
      </NavLink>
    ))}
  </nav>
));

NavLinks.displayName = 'NavLinks';
