import { motion } from "framer-motion";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const NavLink = ({ href, children }: NavLinkProps) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.05 }}
    className="relative text-base text-gray-400 hover:text-[#f7df1e] font-mono 
               transition-colors duration-200 py-2 group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f7df1e] 
                    group-hover:w-full transition-all duration-300" />
  </motion.a>
);
