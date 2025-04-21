import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
  decimals?: number;
}

export const AnimatedCounter = ({
  value,
  duration = 1500,
  className = '',
  formatter = (val) => val.toString(), 
  decimals = 0
}: AnimatedCounterProps) => {
  const endValue = typeof value === 'string' ? parseInt(value, 10) : value;
  const [displayValue, setDisplayValue] = useState<number>(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const mountedRef = useRef<boolean>(false);
  
  const formatNumber = (num: number) => {
    if (formatter) {
      return formatter(Number(num.toFixed(decimals)));
    }
    return Number(num.toFixed(decimals)).toString();
  };

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    
    setDisplayValue(0);
    
    if (isNaN(endValue) || endValue <= 0) {
      return;
    }
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
      const currentValue = easedProgress * endValue;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = undefined;
    };
  }, [endValue, duration]);
  
  const displayText = formatNumber(displayValue);
  
  return <span className={className}>{displayText}</span>;
}; 