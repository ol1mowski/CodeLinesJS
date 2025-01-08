import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
};

export const LazyImage = memo(({ src, alt, className, placeholderClassName }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imageRef} className={className}>
      {isInView && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            className={`absolute inset-0 bg-gray-700/50 animate-pulse rounded-full ${placeholderClassName}`}
          />
          <motion.img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
});

LazyImage.displayName = "LazyImage"; 