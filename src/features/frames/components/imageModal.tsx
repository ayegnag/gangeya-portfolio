import { useEffect, useState } from 'react';
import { ImageModalProps } from '../types/image';

/**
 * ImageModal Component - Polaroid Card Design
 * 
 * Displays image in a polaroid-style card with:
 * - White border around image
 * - Caption space at bottom (max 20% screen height)
 * - Fade out animation on close
 * - ESC key and click outside to close
 * 
 * @param {object} image - Image object to display (null if closed)
 * @param {function} onClose - Handler to close the modal
 */
const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Handle ESC key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for fade out animation before actually closing
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  if (!image) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
      
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 text-white hover:rotate-90 group"
        aria-label="Close modal"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>

      {/* Polaroid Card Container */}
      <div 
        className={`relative max-w-4xl max-h-[90vh] bg-white p-4 rounded shadow-2xl transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-scaleIn'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Image Container with thin white border */}
        <div className="relative bg-white">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[calc(90vh-20vh-2rem)] object-contain rounded"
            style={{ display: 'block' }}
          />
        </div>

        {/* Caption Area - Max 20% of screen height */}
        <div 
          className="bg-white pt-4 pb-2 px-2"
          style={{ 
            maxHeight: '20vh',
            minHeight: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <p className="text-neutral-800 text-center font-light text-lg leading-relaxed">
            {image.caption || image.alt}
          </p>
          {image.date && (
            <p className="text-neutral-400 text-center text-sm mt-2 font-light">
              {image.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;