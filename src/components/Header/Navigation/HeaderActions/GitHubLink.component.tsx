import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export const GitHubLink = () => (
  <motion.a
    href="https://github.com/yourusername/project"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, rotate: 8 }}
    className="text-gray-400 hover:text-js transition-colors"
    aria-label="GitHub Repository"
  >
    <FaGithub className="w-6 h-6" />
  </motion.a>
); 