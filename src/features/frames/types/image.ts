interface LazyImageProps {
    src: string;
    alt: string;
    onClick: () => void;
    className?: string;
}
interface ImageCardProps {
    image: {
        id: number;
        src: string;
        alt: string;
    };
    onImageClick: (image: { id: number; src: string; alt: string }) => void;
}
interface ImageModalProps {
    image: {
        src: string;
        alt: string;
    } | null;
    onClose: () => void;
}
interface Image {
    id: number;
    src: string;
    alt: string;
}

type ImageList = null | { id: number; src: string; alt: string; filename: string; }[]


interface LazyImageProps {
    src: string;
    alt: string;
    onClick: () => void;
    className?: string;
}
