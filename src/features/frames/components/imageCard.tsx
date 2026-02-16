import LazyImage from './lazyImage';

/**
 * ImageCard Component
 * 
 * Wraps individual images with styling and hover effects
 * Handles staggered entry animations
 * Provides visual feedback on hover
 * 
 * @param {object} image - Image object with src, alt, and id
 * @param {function} onImageClick - Handler for image click events
 */
const ImageCard = ({ image, onImageClick }: ImageCardProps) => {
  return (
    <div 
      className="mb-4 break-inside-avoid group"
      style={{ 
        animationDelay: `${Math.random() * 0.3}s`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <LazyImage
          src={image.src}
          alt={image.alt}
          onClick={() => onImageClick(image)}
          className="rounded-lg"
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
};

export default ImageCard;