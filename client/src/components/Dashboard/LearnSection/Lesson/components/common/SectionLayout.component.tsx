import { memo, type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type SectionLayoutProps = PropsWithChildren<{
  id: string;
  index: number;
}>;

export const SectionLayout = memo(({ children, id, index }: SectionLayoutProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="space-y-6"
    id={id}
  >
    {children}
  </motion.div>
)); 