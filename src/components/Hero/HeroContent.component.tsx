import { motion } from "framer-motion";
import { Button } from "../UI/Button.component";
type HeroContentProps = {
  title: string;
  description: string;
  buttonText: string;
}

export const HeroContent = ({ 
  title, 
  description, 
  buttonText, 
}: HeroContentProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full lg:w-1/2 text-center lg:text-left z-10 pt-20 lg:pt-0"
  >
    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-space">
      {title}
    </h1>
    <p className="text-gray-300 text-lg sm:text-xl mb-8 font-inter max-w-2xl mx-auto lg:mx-0">
      {description}
    </p>
    <a href="#about">
      <Button>{buttonText}</Button>
    </a>
  </motion.div>
); 