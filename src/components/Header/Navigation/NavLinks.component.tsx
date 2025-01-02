import { Button } from "../../UI/Button/Button.component";
import { navigationLinks } from "./navigationData";
import { NavLink } from "./NavLink.component";


export const NavLinks = () => (
  <nav className="hidden xl:flex items-center gap-12">
    {navigationLinks.map((item) => (
      <NavLink key={item.href} href={item.href}>
        {item.label}
      </NavLink>
    ))}
    <Button className="ml-4 text-lg">Zaloguj się</Button>
  </nav>
);
