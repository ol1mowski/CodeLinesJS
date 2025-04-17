import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type VirtualListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  overscan?: number;
  className?: string;
};

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  overscan = 3,
  className,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  const getVisibleRange = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;

    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(items.length, Math.ceil((scrollTop + viewportHeight) / itemHeight));

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length, end + overscan),
    };
  }, [itemHeight, items.length, overscan]);

  const handleScroll = useCallback(() => {
    const range = getVisibleRange();
    if (range) {
      setVisibleRange(range);
    }
  }, [getVisibleRange]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const totalHeight = items.length * itemHeight;
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto relative ${className}`}
      style={{ height: '100%' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              top: (visibleRange.start + index) * itemHeight,
              width: '100%',
              height: itemHeight,
            }}
          >
            {renderItem(item, visibleRange.start + index)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const MemoizedVirtualList = memo(VirtualList) as typeof VirtualList;
