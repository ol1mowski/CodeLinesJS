import { motion } from 'framer-motion';

export const Copyright = () => (
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-sm text-gray-400"
  >
    © {new Date().getFullYear()} Aplikację wykonał{' '}
    <a
      href="https://oliwiermarkiewicz.pl/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#f7df1e] hover:text-[#f7df1e]/80"
    >
      Oliwier Markiewicz
    </a>
    . <span>Wszelkie prawa zastrzeżone.</span>
  </motion.p>
);
