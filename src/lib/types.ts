export type MediaItem = {
  type: 'image' | 'video';
  url: string;
  alt: string;
};

export type Category = {
  name: string;
  media: MediaItem[];
}; 