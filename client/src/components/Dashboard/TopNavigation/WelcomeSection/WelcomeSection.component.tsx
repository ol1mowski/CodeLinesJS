import { memo } from "react";
import { motion } from "framer-motion";

type WelcomeSectionProps = {
  username: string;
};

export const WelcomeSection = memo(({ username }: WelcomeSectionProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4"
  >
    <div>
      <h2 className="text-js font-bold text-xl">
        Witaj, {username}! 👋
      </h2>
      <p className="text-gray-400 text-sm">
        Miło Cię znów widzieć
      </p>
    </div>
  </motion.div>
));

WelcomeSection.displayName = "WelcomeSection";