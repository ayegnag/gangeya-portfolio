/**
 * Utility function to dynamically load images from public/frames directory
 * This works with Vite's import.meta.glob
 */

export const loadImagesFromDirectory = () => {
    // Vite's way of importing files dynamically
    const imageModules = import.meta.glob('/public/images/frames/*.{jpg,jpeg,png,gif,webp,svg}', {
        eager: true,
        as: 'url'
    });

    const images = Object.entries(imageModules).map(([path, url], index) => {
        // Extract filename from path
        const filename = path.split('/').pop();
        if (filename) {
            // Create a readable alt text from filename
            const altText = filename
                .replace(/\.[^/.]+$/, '') // Remove extension
                .replace(/[-_]/g, ' ')    // Replace dashes and underscores with spaces
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word

            return {
                id: index + 1,
                src: url,
                alt: altText,
                filename
            };
        }
        return null;
    });

    return images;
};

/**
 * Alternative: If you want to fetch a manifest file
 * You would need to create a manifest.json in public/frames/
 */
export const loadImagesFromManifest = async () => {
    try {
        const response = await fetch('/frames/manifest.json');
        const data = await response.json();

        return data.images.map((img: { filename: any; alt: any; }, index: number) => ({
            id: index + 1,
            src: `/frames/${img.filename}`,
            ...img, // Spread any additional metadata
            alt: img.alt || img.filename // Explicit alt takes precedence
        }));
    } catch (error) {
        console.error('Failed to load image manifest:', error);
        return [];
    }
};

/**
 * For Create React App or Webpack
 * Note: This requires webpack and won't work with Vite
 */
// export const loadImagesWebpack = () => {
//     try {
//         const context = require.context('../../public/frames', false, /\.(jpg|jpeg|png|gif|webp|svg)$/);

//         return context.keys().map((key, index) => {
//             const filename = key.replace('./', '');
//             const altText = filename
//                 .replace(/\.[^/.]+$/, '')
//                 .replace(/[-_]/g, ' ')
//                 .replace(/\b\w/g, char => char.toUpperCase());

//             return {
//                 id: index + 1,
//                 src: `/frames/${filename}`,
//                 alt: altText,
//                 filename
//             };
//         });
//     } catch (error) {
//         console.error('require.context not available:', error);
//         return [];
//     }
// };

/**
 * Simple static list (for when you just want to list your images)
 */
export const getStaticImages = () => {
    return [
        { id: 1, src: '/frames/image1.jpg', alt: 'Gallery image 1' },
        { id: 2, src: '/frames/image2.jpg', alt: 'Gallery image 2' },
        { id: 3, src: '/frames/image3.jpg', alt: 'Gallery image 3' },
        { id: 4, src: '/frames/image4.jpg', alt: 'Gallery image 4' },
        { id: 5, src: '/frames/image5.jpg', alt: 'Gallery image 5' },
        { id: 6, src: '/frames/image6.jpg', alt: 'Gallery image 6' },
        { id: 7, src: '/frames/image7.jpg', alt: 'Gallery image 7' },
        { id: 8, src: '/frames/image8.jpg', alt: 'Gallery image 8' },
        { id: 9, src: '/frames/image9.jpg', alt: 'Gallery image 9' },
    ];
};