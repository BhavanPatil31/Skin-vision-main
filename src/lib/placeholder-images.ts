import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const imageList: ImagePlaceholder[] = data.placeholderImages;

export const placeholderImages: Record<string, ImagePlaceholder> = imageList.reduce((acc, img) => {
  acc[img.id] = img;
  return acc;
}, {} as Record<string, ImagePlaceholder>);
