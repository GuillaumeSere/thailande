'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import type { MediaItem } from '../lib/types';

type CarouselProps = {
  media: MediaItem[];
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {media.map((item, index) => (
          <div
            className="embla__slide relative h-[90vh] flex justify-center items-center"
            key={index}
          >
            {item.type === 'image' ? (
              <Image
                src={item.url}
                alt={item.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                priority={index === 0}
              />
            ) : item.url.includes('youtube.com/embed') ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-full h-0 pb-[56.25%] relative">
                  <iframe
                    src={item.url}
                    title={item.alt}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <video
                src={item.url}
                controls
                preload="metadata"
                className="max-w-full max-h-full w-auto h-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
