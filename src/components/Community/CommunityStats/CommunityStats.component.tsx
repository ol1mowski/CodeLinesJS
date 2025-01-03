import { motion } from "framer-motion";

import { StatCard } from "../../Progress/ProgressStats/StatCard.component";
import { communityStats } from "../../../data/communityStats.data";
import { LeaderboardCard } from "./LeaderboardCard.component";


export const CommunityStats = () => (
  <div className="w-full xl:w-1/2 px-4 md:px-0">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
    >
      {communityStats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </motion.div>
    <LeaderboardCard />
  </div>
); 