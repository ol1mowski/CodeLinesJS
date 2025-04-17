import { motion } from 'framer-motion';
import { Button } from '../../../UI/Button/Button.component';
import { navigationLinks } from '../navigationData';
import { MobileMenuItem } from './MobileMenuItem.component';
import { Link } from 'react-router-dom';

type MobileMenuContentProps = {
  onClose: () => void;
};

export const MobileMenuContent = ({ onClose }: MobileMenuContentProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="h-screen flex flex-col items-center justify-center gap-8 px-4"
  >
    {navigationLinks.map((item, index) => (
      <MobileMenuItem key={item.href} {...item} index={index} onClick={onClose} />
    ))}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: navigationLinks.length * 0.1 },
      }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Link to="/logowanie">
        <Button onClick={onClose} className="mt-4 text-xl px-12">
          Zaloguj się
        </Button>
      </Link>
    </motion.div>
  </motion.div>
);
