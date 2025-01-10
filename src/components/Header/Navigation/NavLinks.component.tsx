import { navigationLinks } from "./navigationData";
import { NavLink } from "./NavLink.component";


export const NavLinks = () => (
  <nav className="flex items-center gap-10">
    {navigationLinks.map((item) => (
      <NavLink key={item.href} href={item.href}>
        {item.label}
      </NavLink>
    ))}
  </nav>
);
