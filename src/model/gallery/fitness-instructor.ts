export type GalleryItem = {
  title: string;
  tagline: string;
  imgSrc: string;
  id: string;
};

export const galleryItems: Array<GalleryItem> = [
  {
    title: 'Get Fit',
    tagline: 'Outlast the competition with strength and conditioning training.',
    imgSrc: '/gallery/fitness-gallery-1.jpg',
    id: 'fitness-gallery-1',
  },
  {
    title: 'Reach Your Goals',
    tagline: 'Train to win and unleash the champion inside you.',
    imgSrc: '/gallery/fitness-gallery-2.jpg',
    id: 'fitness-gallery-2',
  },
  {
    title: 'Push Yourself',
    tagline: 'Break through your limits and reach new heights.',
    imgSrc: '/gallery/fitness-gallery-3.jpg',
    id: 'fitness-gallery-3',
  },
  {
    title: 'Learn the Basics',
    tagline: 'Build a strong foundation of boxing fundamentals.',
    imgSrc: '/gallery/fitness-gallery-4.jpg',
    id: 'fitness-gallery-4',
  },
  {
    title: 'Find Your Focus',
    tagline: 'Gain a mental and physical edge over your opponents.',
    imgSrc: '/gallery/fitness-gallery-5.jpg',
    id: 'fitness-gallery-5',
  },
  {
    title: 'Take it to the next level',
    tagline: 'Reach new heights with advanced training techniques.',
    imgSrc: '/gallery/fitness-gallery-6.jpg',
    id: 'fitness-gallery-6',
  },
];
