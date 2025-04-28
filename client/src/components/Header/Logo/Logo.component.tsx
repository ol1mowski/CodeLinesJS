import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center z-50 relative">
    <Link
      to="/"
      className="text-3xl font-bold font-space text-[#f7df1e] hover:text-[#f7df1e]/90 
                 transition-colors flex items-center gap-2"
    >
      <span className="text-2xl bg-[#f7df1e] text-black px-2 py-1 rounded">CLJS</span>
      <span>CodeLines</span>
    </Link>
  </motion.div>
);
