import { useEffect } from "react";

export const useClickOutside = (callback: () => void, excludeClasses: string[]) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldExclude = excludeClasses.some(className => 
        target.closest(`.${className}`)
      );

      if (!shouldExclude) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, excludeClasses]);
}; 