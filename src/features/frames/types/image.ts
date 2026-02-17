export interface LazyImageProps {
    src: string;
    alt: string;
    onClick: () => void;
    className?: string;
}

// Base image shape — every image has these
export interface Image {
  id: number;
  src: string;
  alt: string;
  filename: string;
  caption: string;
  date: string;
  tags?: string[];
}

// Nullable list used before fetch resolves
export type ImageList = Image[] | null;

export interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

export interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}