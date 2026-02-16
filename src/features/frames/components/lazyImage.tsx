import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage Component
 * 
 * Implements lazy loading using Intersection Observer API
 * Shows a loading skeleton while image loads
 * Provides smooth fade-in animation
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */

const LazyImage = ({ src, alt, onClick, className = '' }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Create intersection observer to detect when image enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once image is in view
          }
        });
      },
      { 
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {isInView && (
        <>
          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 animate-pulse" />
          )}
          
          {/* Actual image */}
          <img
            src={src}
            alt={alt}
            onClick={onClick}
            className={`w-full h-auto transition-all duration-700 cursor-pointer hover:opacity-90 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${className}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy" // Native lazy loading as fallback
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;