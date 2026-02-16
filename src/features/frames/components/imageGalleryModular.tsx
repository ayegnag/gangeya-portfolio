import { useState, useEffect } from 'react';
import ImageCard from './imageCard';
import ImageModal from './imageModal';
import { loadImagesFromDirectory } from '../utils/imageLoader';

/**
 * ImageGallery Component - Modular Version
 * 
 * This version imports components from separate files
 * Use this if you prefer better file organization
 * 
 * Main responsibilities:
 * - Load images from source
 * - Manage responsive column layout
 * - Handle modal state
 * - Coordinate between child components
 */
const ImageGalleryModular = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [columnCount, setColumnCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  // Load images on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        
        // Choose your loading method:
        // Option 1: Dynamic loading (Vite)
        const imageList: ImageList = loadImagesFromDirectory().filter((image) => image !== null);
        
        // Option 2: From manifest
        // const imageList = await loadImagesFromManifest();
        
        // Option 3: Static list
        // const imageList = getStaticImages();
        
        setImages(imageList);
      } catch (error) {
        console.error('Failed to load images:', error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Responsive column count based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);  // Mobile: 1 column
      } else if (width < 768) {
        setColumnCount(2);  // Tablet: 2 columns
      } else {
        setColumnCount(3);  // Desktop: 3 columns
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 transition-colors duration-500">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
          <div className="max-w-[768px] mx-auto px-4 py-6">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-white">
              Frames
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-light tracking-wide">
              {isLoading ? 'Loading...' : `${images.length} ${images.length === 1 ? 'image' : 'images'}`} | A small collection of captured moments out of hobby over the years.
            </p>
          </div>
        </header>

        {/* Main Gallery Container */}
        <main className="max-w-[768px] mx-auto px-4 py-8">
          {isLoading ? (
            // Loading state
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-600 dark:border-t-neutral-300 rounded-full animate-spin"></div>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-sm">
                Loading images...
              </p>
            </div>
          ) : images.length === 0 ? (
            // Empty state
            <div className="text-center py-20">
              <svg 
                className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light">
                No images found in /public/frames/
              </p>
              <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
                Add your images to get started
              </p>
            </div>
          ) : (
            // Masonry grid layout
            <div 
              className="columns-1 sm:columns-2 md:columns-3 gap-4"
              style={{ columnCount }}
            >
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </main>

        {/* Modal for full-size image view */}
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </>
  );
};

export default ImageGalleryModular;