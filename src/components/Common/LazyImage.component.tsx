import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { compressImageUrl } from "../../utils/imageCompression";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  compressionOptions?: {
    maxWidth: number;
    maxHeight: number;
    quality: number;
  };
};

export const LazyImage = memo(({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  compressionOptions = { maxWidth: 800, maxHeight: 800, quality: 0.8 }
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [compressedSrc, setCompressedSrc] = useState(src);
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

  useEffect(() => {
    if (isInView) {
      compressImageUrl(src, compressionOptions).then(setCompressedSrc);
    }
  }, [isInView, src, compressionOptions]);

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
            src={compressedSrc}
            alt={alt}
            className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={() => setIsLoaded(true)}
            style={{ 
              willChange: 'transform', // Optymalizacja GPU
              transform: 'translateZ(0)' // Optymalizacja GPU
            }}
          />
        </>
      )}
    </div>
  );
});

LazyImage.displayName = "LazyImage"; 