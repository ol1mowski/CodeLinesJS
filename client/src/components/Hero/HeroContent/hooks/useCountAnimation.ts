import { useState, useEffect, useRef } from 'react';

interface CountAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
}

export const useCountAnimation = (
  endValue: string | number,
  options: CountAnimationOptions = {}
): string => {
  const { 
    duration = 2000, 
    delay = 0,
    easing = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  } = options;
  
  const [count, setCount] = useState<number>(0);
  const finalValue = typeof endValue === 'string' ? parseInt(endValue, 10) : endValue;
  const hasAnimatedRef = useRef(false);
  
  if (isNaN(finalValue)) {
    return String(endValue);
  }
  
  useEffect(() => {
    if (finalValue > 0) {
      setCount(0);
      hasAnimatedRef.current = false;
    }
  }, [finalValue]);
  
  useEffect(() => {
    if (finalValue <= 0 || hasAnimatedRef.current) return;
    
    let startTime: number | null = null;
    let animationFrame: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          
          const easedProgress = easing(progress);
          
          const currentValue = Math.round(easedProgress * finalValue);
          setCount(currentValue);
          
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(finalValue);
          hasAnimatedRef.current = true;
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [finalValue, duration, delay, easing]);
  
  return String(count);
}; 