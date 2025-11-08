interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}
// eslint-disable-next-line unused-imports/no-unused-vars
interface HeroSliderProps {
  slides: Slide[];
  strapiUrl: string;
}
interface MediaItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: ImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  backgroundType: "image" | "video";
  buttonText: string;
  buttonLink: string;
  backgroundImage: MediaItem | null;
  backgroundVideo: MediaItem | null;
  foregroundImage: MediaItem | null;
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface PresentationDocument {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slides: Slide[];
}
