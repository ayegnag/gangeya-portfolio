import { useState, useEffect, useRef } from 'react';

// ============================================
// LAZY IMAGE COMPONENT
// ============================================

const LazyImage = ({ src, alt, onClick, className = '' }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '50px' }
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
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 animate-pulse" />
                    )}
                    <img
                        src={src}
                        alt={alt}
                        onClick={onClick}
                        className={`w-full h-auto transition-all duration-700 cursor-pointer hover:opacity-90 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            } ${className}`}
                        onLoad={() => setIsLoaded(true)}
                        loading="lazy"
                    />
                </>
            )}
        </div>
    );
};

// ============================================
// IMAGE CARD COMPONENT
// ============================================

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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
            </div>
        </div>
    );
};

// ============================================
// MODAL COMPONENT
// ============================================

const ImageModal = ({ image, onClose }: ImageModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 text-white hover:rotate-90 group"
                aria-label="Close modal"
            >
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Container */}
            <div
                className="relative max-w-7xl max-h-[90vh] animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
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

// ============================================
// MAIN GALLERY COMPONENT
// ============================================

const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [columnCount, setColumnCount] = useState(3);

    // Load images from public/frames/
    useEffect(() => {
        // In a real scenario, you might fetch this list from an API or use a build-time script
        // For now, we'll create a function that assumes you have images in public/frames/
        const loadImages = () => {
            // Example: Create an array of image paths
            // You'll need to replace this with your actual image list
            const imageList = [
                { id: 1, src: '/frames/image1.jpg', alt: 'Gallery image 1' },
                { id: 2, src: '/frames/image2.jpg', alt: 'Gallery image 2' },
                { id: 3, src: '/frames/image3.jpg', alt: 'Gallery image 3' },
                { id: 4, src: '/frames/image4.jpg', alt: 'Gallery image 4' },
                { id: 5, src: '/frames/image5.jpg', alt: 'Gallery image 5' },
                { id: 6, src: '/frames/image6.jpg', alt: 'Gallery image 6' },
                { id: 7, src: '/frames/image7.jpg', alt: 'Gallery image 7' },
                { id: 8, src: '/frames/image8.jpg', alt: 'Gallery image 8' },
                { id: 9, src: '/frames/image9.jpg', alt: 'Gallery image 9' },
                // Add more images as needed
            ];
            setImages(imageList);
        };

        loadImages();
    }, []);

    // Responsive column count
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setColumnCount(1);
            } else if (width < 768) {
                setColumnCount(2);
            } else {
                setColumnCount(3);
            }
        };

        handleResize();
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
                {/* Header */}
                <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
                    <div className="max-w-[768px] mx-auto px-4 py-6">
                        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-white">
                            Gallery
                        </h1>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-light tracking-wide">
                            {images.length} {images.length === 1 ? 'image' : 'images'}
                        </p>
                    </div>
                </header>

                {/* Gallery Container */}
                <main className="max-w-[768px] mx-auto px-4 py-8">
                    {images.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light">
                                No images found in /public/frames/
                            </p>
                            <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
                                Add your images to get started
                            </p>
                        </div>
                    ) : (
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

                {/* Modal */}
                {selectedImage && (
                    <ImageModal image={selectedImage} onClose={handleCloseModal} />
                )}
            </div>
        </>
    );
};

export default ImageGallery;