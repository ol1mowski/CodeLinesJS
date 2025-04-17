import { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../../../UI/Button/Button.component';
import { WarningBox } from '../WarningBox/WarningBox.component';

interface InitialWarningProps {
  onConfirm: () => void;
}

export const InitialWarning = memo(({ onConfirm }: InitialWarningProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full max-w-md sm:ml-0 sm:mr-auto px-4 sm:px-0"
  >
    <WarningBox />
    <Button
      type="button"
      onClick={onConfirm}
      className="w-full px-6 py-3 rounded-lg bg-red-500/20 text-red-400 
        hover:bg-red-500/30 transition-colors duration-200 shadow-none
        text-base sm:text-lg font-medium"
    >
      Chcę usunąć konto
    </Button>
  </motion.div>
));

InitialWarning.displayName = 'InitialWarning';
