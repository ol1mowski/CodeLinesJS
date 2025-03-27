import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useMobileDetect } from '../../../hooks/useMobileDetect';

interface MobileWrapperProps {
  children: ReactNode;
  motionProps: MotionProps;
  className?: string;
}

export const MobileWrapper = ({ children, motionProps, className = '' }: MobileWrapperProps) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  return <motion.div className={className} {...motionProps}>{children}</motion.div>;
};

export const MobileWrapperH1 = ({ children, motionProps, className = '' }: MobileWrapperProps) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return <h1 className={className}>{children}</h1>;
  }
  
  return <motion.h1 className={className} {...motionProps}>{children}</motion.h1>;
};

export const MobileWrapperH2 = ({ children, motionProps, className = '' }: MobileWrapperProps) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return <h2 className={className}>{children}</h2>;
  }
  
  return <motion.h2 className={className} {...motionProps}>{children}</motion.h2>;
};

export const MobileWrapperP = ({ children, motionProps, className = '' }: MobileWrapperProps) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return <p className={className}>{children}</p>;
  }
  
  return <motion.p className={className} {...motionProps}>{children}</motion.p>;
}; 