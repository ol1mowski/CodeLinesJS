import { memo } from 'react';
import { motion } from 'framer-motion';
import { GiTakeMyMoney } from 'react-icons/gi';

export const ErrorHeader = memo(() => (
  <div className="text-center mb-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      <GiTakeMyMoney className="text-[150px] text-js" />
    </motion.div>

    <motion.h1
      className="text-7xl font-bold text-js mb-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      404
    </motion.h1>

    <motion.p
      className="text-xl text-gray-400 mb-8"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Ups! Wygląda na to, że zabłądziłeś w kodzie...
    </motion.p>
  </div>
));

ErrorHeader.displayName = 'ErrorHeader';
