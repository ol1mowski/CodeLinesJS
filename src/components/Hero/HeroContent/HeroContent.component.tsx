import { motion } from "framer-motion";
import { Button } from "../../UI/Button/Button.component";

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
    className="w-full xl:w-1/2 mx-auto lg:mx-0 text-center lg:text-left z-10 pt-32"
  >
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-space max-w-4xl mx-auto lg:mx-0">
      {title}
    </h1>
    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 font-inter max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
      {description}
    </p>
    <a href="#about">
      <Button className="text-lg md:text-xl px-8 py-4">
        {buttonText}
      </Button>
    </a>
  </motion.div>
); 