import { motion } from "framer-motion";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const NavLink = ({ href, children }: NavLinkProps) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    className="text-xl text-gray-300 hover:text-indigo-400 font-inter transition-colors duration-200"
  >
    {children}
  </motion.a>
);
