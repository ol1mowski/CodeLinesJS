import { motion } from "framer-motion";

import { challenges } from "../../../data/challengesData.data";
import { ChallengeCard } from "./ChallengeCard.component";


export const ChallengesList = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="w-full xl:w-1/2 flex flex-col gap-4 px-4 md:px-0"
  >
    {challenges.map((challenge, index) => (
      <ChallengeCard
        key={challenge.title}
        {...challenge}
        index={index}
      />
    ))}
  </motion.div>
); 