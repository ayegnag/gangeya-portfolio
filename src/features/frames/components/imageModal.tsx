import { useEffect } from 'react';

/**
 * ImageModal Component
 * 
 * Full-screen modal for viewing images in larger size
 * Features:
 * - Click outside to close
 * - ESC key to close
 * - Animated entrance
 * - Backdrop blur effect
 * - Prevents body scroll when open
 * 
 * @param {object} image - Image object to display (null if closed)
 * @param {function} onClose - Handler to close the modal
 */
const ImageModal = ({ image, onClose }:ImageModalProps) => {
  useEffect(() => {
    // Handle ESC key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
      
      {/* Close Button */}
      <button
        onClick={onClose}
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

      {/* Image Container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking on image
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImageModal;