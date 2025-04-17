import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-2 rounded-lg bg-[#f7df1e] text-black font-bold 
                hover:bg-[#f7df1e]/90 transition-all shadow-lg 
                shadow-[#f7df1e]/25 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);
